import { useEffect, useRef, useState } from 'react'
import { encodePCMToMP3 } from '@/helps/mp3Encoder'

interface Props {
  onConfirmSend: (blob: Blob) => void
}

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as any).MSStream

export const voiceRecorder = ({ onConfirmSend }: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null)

  // MediaRecorder (non-iOS)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Web Audio (iOS)
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioBuffersRef = useRef<Float32Array[]>([])

  /* ---------------- START RECORDING ---------------- */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    /* ===== iOS PATH ===== */
    if (isIOS()) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const audioContext = new AudioCtx()

      // REQUIRED on iOS
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }
      audioContextRef.current = audioContext

      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      /**
       * ScriptProcessorNode is deprecated BUT
       * AudioWorklet is NOT stable on iOS Safari.
       * This is the only production-safe solution.
       */
      const processor = audioContext.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor

      audioBuffersRef.current = []

      processor.onaudioprocess = (e) => {
        audioBuffersRef.current.push(
          new Float32Array(e.inputBuffer.getChannelData(0))
        )
      }

      source.connect(processor)
      processor.connect(audioContext.destination)

      setIsRecording(true)
      return
    }

    /* ===== NON-iOS PATH ===== */
    const recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType })
      setPendingBlob(blob)
      setAudioURL(URL.createObjectURL(blob))
    }

    recorder.start()
    mediaRecorderRef.current = recorder
    setIsRecording(true)
  }

  /* ---------------- STOP RECORDING ---------------- */
  const stopRecording = async () => {
    setIsRecording(false)

    /* ===== iOS STOP ===== */
    if (isIOS()) {
      processorRef.current?.disconnect()
      sourceRef.current?.disconnect()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      
      // DO NOT close context before encoding
      const mp3Blob = encodePCMToMP3(
        audioBuffersRef.current,
        audioContextRef.current!.sampleRate,
        64
      )
      
      // Set state BEFORE closing AudioContext
      setPendingBlob(mp3Blob)
      setAudioURL(URL.createObjectURL(mp3Blob))

      // Now it’s safe to close
      await audioContextRef.current?.close()

      // At this point, React shows Send / Discard UI correctly
      return
    }

    /* ===== NON-iOS STOP ===== */
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }

  /* ---------------- CONTROLS ---------------- */
  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording()
  }

  const confirmSend = () => {
    if (!pendingBlob) return
    onConfirmSend(pendingBlob)
    cleanup()
  }

  const cleanup = () => {
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
    setPendingBlob(null)
  }

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL)
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [audioURL])

  return {
    isRecording,
    toggleRecording,
    audioURL,
    confirmSend,
    cleanup,
  }
}