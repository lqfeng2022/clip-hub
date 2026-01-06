import { useState, useEffect } from 'react'

interface Props {
  // callback to send audio to backend
  onConfirmSend: (blob: Blob) => void 
}
export const voiceRecorder = ({ onConfirmSend }: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null)
  const [audioURL, setAudioURL] = useState<string | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setPendingBlob(blob)
        setAudioURL(URL.createObjectURL(blob))
        // onSend(blob) // callback to send audio
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (err) {
      console.error('Microphone access denied or failed', err)
    }
  }


  const stopRecording = () => {
    mediaRecorder?.stop()
    setIsRecording(false)
  }

  
  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording()
  }
  
  const cleanup = () => {
    setPendingBlob(null)
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
  }

  const confirmSend = () => {
    if (!pendingBlob) return
    onConfirmSend(pendingBlob)
    cleanup()
  }  

  // Cleanup URL object when unmounted or audio changes
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL)
    }
  }, [audioURL])

  return { isRecording, toggleRecording, audioURL, confirmSend, cleanup }
}