// hooks/realtime-call/useTTSController.ts
import { useRef } from 'react'
import { useTTSSocket } from './useTTSSocket'
import { CallState } from '@/types/call'

interface Props {
  hostSlug: string
  audio: {
    push: (chunk: ArrayBuffer) => void
    reset: () => void
  }
  transitionTo: (state: CallState) => void
  onError?: (err: any) => void
}
export function useTTSController({ hostSlug, audio, transitionTo, onError }: Props) {
  const ttsPlayingRef = useRef(false)

  const tts = useTTSSocket({ hostSlug,
    onAudioChunk: (chunk) => {
      audio.push(chunk)
    },

    onEnd: () => {
      console.log('🔥 TTS ended') // debug

      ttsPlayingRef.current = false

      transitionTo('idle') // unified state control
    },

    onError: (err) => {
      console.warn('TTS error', err)

      ttsPlayingRef.current = false
      audio.reset()

      transitionTo('idle')

      onError?.(err)
    },
  })

  // ---- public API ----
  const start = (text: string) => {
    if (!text || ttsPlayingRef.current) {
      console.log('🔥 TTS already playing or empty text') // debug
      return
    }

    console.log('🔥 start TTS:', text)

    ttsPlayingRef.current = true

    transitionTo('speaking') // central state change

    tts.start(text)
  }

  const stop = () => {
    if (!ttsPlayingRef.current) return
    console.log('🔥 stop TTS') // debug

    tts.stop()
    audio.reset()

    ttsPlayingRef.current = false

    transitionTo('idle')
  }

  const isPlaying = () => ttsPlayingRef.current

  return { start, stop, isPlaying }
}