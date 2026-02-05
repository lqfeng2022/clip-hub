import { useEffect, useRef, useState } from 'react'

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

  /*  START  */
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