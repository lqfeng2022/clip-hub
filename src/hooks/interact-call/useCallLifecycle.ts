// hooks/realtime-call/useCallLifecycle.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClientEvent } from '@/protocol/call'

interface Props {
  connected: boolean
  sendEvent: (type: ClientEvent, data?: any) => void
  stt: {
    start: () => Promise<void>
    stop: () => void
  }
  tts: {
    stop: () => void
  }
}
export function useCallLifecycle({ connected, sendEvent, stt, tts }: Props) {
  const [duration, setDuration] = useState(0)

  const timerRef = useRef<number | null>(null)
  const endedRef = useRef(false)
  const startedRef = useRef(false)

  // ---- timer ----
  const startTimer = useCallback(() => {
    if (timerRef.current) return

    timerRef.current = window.setInterval(() => {
      setDuration((d) => d + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setDuration(0)
  }, [])

  // ---- start call ----
  const startCall = useCallback(async () => {
    if (endedRef.current || startedRef.current) return

    startedRef.current = true

    console.log('🔥 Call started') // debug

    await stt.start()
    startTimer()
  }, [stt, startTimer])

  // ---- teardown ----
  const endCall = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true

    console.log('🔥 Call teardown') // debug

    try {
      sendEvent(ClientEvent.CALL_END)
    } catch {}

    stt.stop()
    tts.stop()
    stopTimer()
  }, [sendEvent, stt, tts, stopTimer])

  // ---- connection lifecycle ----
  useEffect(() => {
    if (!connected) return
    startCall()
  }, [connected, startCall])

  return { duration, endCall }
}