import { useEffect, useRef, useState } from 'react'
import { audioManager } from './audioManager'

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
  const pausedElementsRef = useRef<Map<HTMLMediaElement, { paused: boolean; muted: boolean }>>(new Map())

  /*  START  */
  const startRecording = async () => {
    try {
      // Stop any site audio playback so microphone captures only the user
      try {
        audioManager.stop()

        const mediaEls = Array.from(document.querySelectorAll('audio,video')) as HTMLMediaElement[]
        mediaEls.forEach((el) => {
          // save previous state
          pausedElementsRef.current.set(el, { paused: el.paused, muted: el.muted })
          try {
            el.pause()
          } catch (e) {}
          try {
            el.muted = true
          } catch (e) {}
        })
      } catch (e) {
        console.warn('failed to silence page audio before recording', e)
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType })
        const url = URL.createObjectURL(blob)

        setPendingBlob(blob)
        setAudioURL(url)
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
    } catch (err) {
      console.error('startRecording failed', err)
    }
  }

  /*  STOP  */
  const stopRecording = () => {
    setIsRecording(false)
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())

    // Restore media elements that were muted/paused when recording started
    try {
      pausedElementsRef.current.forEach((state, el) => {
        try {
          el.muted = state.muted
        } catch (e) {}
        if (!state.paused) {
          // resume playback if it was playing before
          const p = el.play()
          if (p && typeof p.then === 'function') p.catch(() => {})
        }
      })
    } catch (e) {}
    pausedElementsRef.current.clear()
  }

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording()
  }

  /*  ACTIONS  */
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

  /*  UNMOUNT  */
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