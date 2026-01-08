// src/helps/voiceRecorder.ts
import { useEffect, useRef, useState } from 'react'
import { encodePCMToMP3 } from '@/helps/mp3Encoder'
import { logger } from '@/helps/fileLogger'

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

  // Non-iOS
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // iOS Web Audio
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioBuffersRef = useRef<Float32Array[]>([])

  /* ---------------- START RECORDING ---------------- */
  const startRecording = async () => {
    try {
      logger.debug('Requesting microphone access')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      logger.info('Microphone access granted', stream)

      if (isIOS()) {
        logger.debug('iOS detected, initializing AudioContext')
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        const audioContext = new AudioCtx()
        audioContextRef.current = audioContext

        if (audioContext.state === 'suspended') {
          logger.debug('Resuming suspended AudioContext')
          await audioContext.resume()
          logger.debug('AudioContext resumed', audioContext.state)
        }

        const source = audioContext.createMediaStreamSource(stream)
        sourceRef.current = source

        const processor = audioContext.createScriptProcessor(4096, 1, 1)
        processorRef.current = processor

        audioBuffersRef.current = []

        processor.onaudioprocess = (e) => {
          audioBuffersRef.current.push(new Float32Array(e.inputBuffer.getChannelData(0)))
          logger.debug('Captured audio buffer chunk', e.inputBuffer.length)
        }

        source.connect(processor)
        processor.connect(audioContext.destination)

        setIsRecording(true)
        logger.info('iOS recording started')
        return
      }

      // Non-iOS
      logger.debug('Non-iOS detected, using MediaRecorder')
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
        logger.debug('MediaRecorder chunk available', e.data.size)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType })
        setPendingBlob(blob)
        setAudioURL(URL.createObjectURL(blob))
        logger.info('MediaRecorder stopped, blob size:', blob.size)
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      logger.info('Non-iOS recording started')
    } catch (err) {
      logger.error('Failed to start recording', err)
    }
  }

  /* ---------------- STOP RECORDING ---------------- */
  const stopRecording = async () => {
    try {
      setIsRecording(false)

      if (isIOS()) {
        logger.debug('Stopping iOS recording')
        processorRef.current?.disconnect()
        sourceRef.current?.disconnect()
        streamRef.current?.getTracks().forEach(t => t.stop())

        if (!audioBuffersRef.current.length) {
          logger.warn('No audio captured on iOS')
          return
        }

        const sampleRate = audioContextRef.current!.sampleRate
        logger.debug('Encoding PCM to MP3, buffer chunks:', audioBuffersRef.current.length)
        const mp3Blob = encodePCMToMP3(audioBuffersRef.current, sampleRate, 64)
        logger.info('MP3 encoding complete, blob size:', mp3Blob.size)

        // 🔑 Set state before closing AudioContext
        const url = URL.createObjectURL(mp3Blob)
        setPendingBlob(mp3Blob)
        setAudioURL(url)

        // Defer AudioContext closing so React re-renders Send/Discard UI
        setTimeout(() => {
          audioContextRef.current?.close()
          audioContextRef.current = null
          processorRef.current = null
          sourceRef.current = null
          streamRef.current = null
          logger.debug('AudioContext closed and cleaned up')
        }, 0)

        // Optional: download logs automatically (allowed because Stop button is a user gesture)
        setTimeout(() => {
          logger.download()
        }, 0)

        return
      }

      // Non-iOS
      mediaRecorderRef.current?.stop()
      streamRef.current?.getTracks().forEach(t => t.stop())
    } catch (err) {
      logger.error('Error during stopRecording', err)
    }
  }

  /* ---------------- CONTROLS ---------------- */
  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording()
  }

  const confirmSend = () => {
    if (!pendingBlob) {
      logger.warn('confirmSend called but no pending blob')
      return
    }
    logger.info('Sending audio blob to backend, size:', pendingBlob.size)
    onConfirmSend(pendingBlob)
    cleanup()
  }

  const cleanup = () => {
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
    setPendingBlob(null)
    logger.debug('Cleaned up recording state')
  }

  /* ---------------- CLEANUP ON UNMOUNT ---------------- */
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL)
      streamRef.current?.getTracks().forEach(t => t.stop())
      logger.debug('Component unmounted, cleaned up streams')
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