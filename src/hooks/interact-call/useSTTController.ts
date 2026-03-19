// hooks/realtime-call/useSTTController.ts
import { useCallback, useRef, useState } from 'react'
import { useSTTRealtime } from './useSTTRealtime'
import { ClientEvent } from '@/protocol/call'
import { useEffect } from 'react'
import { CallState } from '@/types/call'

type CallBlockReason =
  | null
  | 'mic-unavailable'
  | 'permission-denied'
  | 'device-muted'

interface Props {
  state: CallState
  transitionTo: (state: CallState) => void
  sendEvent: (type: ClientEvent, data?: any) => void
  tts: {
    stop: () => void
  }
}
export function useSTTController({ state, transitionTo, sendEvent, tts }: Props) {
  const [callBlockReason, setCallBlockReason] = useState<CallBlockReason>(null)

  const sttStartedRef = useRef(false)

  const stt = useSTTRealtime({
    onPartialText: (text) => {
      // barge-in
      if (state === 'speaking') {
        console.log('🔥 Barge-in: interrupt TTS') // debug
        tts.stop()            // handles audio + state
        transitionTo('idle')  // ensure clean state
      }

      try {
        sendEvent(ClientEvent.TEXT_PARTIAL, {
          text,
          ts: Date.now(),
        })
        console.log('text_partial:', text) // debug
      } catch (err) {
        console.warn('🔥 Failed to send partial text:', err)
      }
    },

    onFinalText: (text) => {
      try {
        sendEvent(ClientEvent.TEXT_FINAL, {
          text,
          ts: Date.now(),
        })
        console.log('text_final:', text)
      } catch (err) {
        console.warn('🔥 Failed to send final text:', err)
      }
    },
  })

  // ---- mic + start ----
  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      const track = stream.getAudioTracks()[0]

      console.log('🔥 mic diagnostics', {
        readyState: track?.readyState,
        muted: track?.muted,
        enabled: track?.enabled,
        label: track?.label,
      }) // debug

      if (!track || track.readyState !== 'live') {
        setCallBlockReason('mic-unavailable')
      }

      if (track.muted) {
        setCallBlockReason('device-muted')
      }

      setCallBlockReason(null)
      
      console.log('🔥 Starting STT')
      if (!sttStartedRef.current) {
        stt.start()
        sttStartedRef.current = true
      }
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        setCallBlockReason('permission-denied')
      }

      console.warn('🔥 Microphone/STT error:', err)
    }
  }, [stt])

  // ---- control ----
  const stop = () => {
    console.log('🔥 STT stop') // debug
    stt.stop()
    sttStartedRef.current = false
  }

  const pause = () => {
    stt.pause()
  }

  const resume = () => {
    stt.resume()
  }

  useEffect(() => {
    if (state === 'thinking' || state === 'speaking') {
      stt.pause()
    }

    if (state === 'idle') {
      stt.resume()
    }
  }, [state])

  return { start, stop, pause, resume, callBlockReason }
}