// src/helps/voiceRecorder.ts
import { useEffect, useRef, useState } from 'react'
import { encodePCMToMP3 } from './mp3Encoder'

interface Props {
  onConfirmSend: (blob: Blob) => void
}

export const voiceRecorder = ({ onConfirmSend }: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

  /* ---------- START ---------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      recorder.onstop = async () => {
        const webmBlob = new Blob(chunksRef.current)
        const arrayBuffer = await webmBlob.arrayBuffer()
        const audioCtx = new AudioContext()
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

        // Take first channel (mono) for MP3
        const buffers = [audioBuffer.getChannelData(0)]
        const mp3Blob = encodePCMToMP3(buffers, audioBuffer.sampleRate, 64)

        setPendingBlob(mp3Blob)
        setAudioURL(URL.createObjectURL(mp3Blob))
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
    } catch (err) {
      console.error('startRecording failed', err)
    }
  }

  /* ---------- STOP ---------- */
  const stopRecording = () => {
    setIsRecording(false)
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
  }

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording()
  }

  /* ---------- ACTIONS ---------- */
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

  /* ---------- UNMOUNT ---------- */
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL)
      streamRef.current?.getTracks().forEach(t => t.stop())
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