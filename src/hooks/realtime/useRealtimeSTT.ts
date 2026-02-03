// hooks/realtime-call/useRealtimeSTT.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import { Scribe, RealtimeEvents, type ScribeErrorMessage } from '@elevenlabs/client'

type TranscriptEvent = { text: string }

interface Props {
  onFinalText?: (text: string) => void
  onPartialText?: (text: string) => void
}
export function useRealtimeSTT({ onFinalText, onPartialText }: Props) {
  const connectionRef = useRef<ReturnType<typeof Scribe.connect> | null>(null)

  const activeRef = useRef(false)
  const pausedRef = useRef(false) // add pase reference
  const startingRef = useRef(false)
  const stoppingRef = useRef(false)

  const sessionIdRef = useRef(0)

  // Mic work checking use state variable:
  const firstSpeechTimeoutRef = useRef<number | null>(null)

  const [isConnected, setIsConnected] = useState(false)

  // ---- token fetch ----
  const fetchToken = async () => {
    const res = await fetch('https://clipwords.me/scribe-token', {
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch scribe token')
    }

    const data = await res.json()
    return data.token as string
  }

  // ---- hard cleanup ----
  const cleanup = useCallback(() => {
    connectionRef.current = null
    activeRef.current = false
    pausedRef.current = false // initialize it as false
    startingRef.current = false
    stoppingRef.current = false
    setIsConnected(false)
  }, [])

  // ---- start (ONLY ONCE PER CALL) ----
  const start = useCallback(async () => {
    if (activeRef.current || startingRef.current) return

    console.log('🎤 STT starting...')
    startingRef.current = true
    stoppingRef.current = false
    pausedRef.current = false

    const sessionId = ++sessionIdRef.current

    try {
      const token = await fetchToken()

      // Guard: stop was requested while fetching token
      if (stoppingRef.current || sessionId !== sessionIdRef.current) {
        startingRef.current = false
        return
      }

      const connection = Scribe.connect({
        token,
        modelId: 'scribe_v2_realtime',
        microphone: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      connectionRef.current = connection

      // ---- EVENTs ----
      connection.on(RealtimeEvents.OPEN, () => {
        if (sessionId !== sessionIdRef.current) return
        console.log('🎤 STT connected')

        activeRef.current = true
        startingRef.current = false
        setIsConnected(true)
      })

      connection.on(RealtimeEvents.SESSION_STARTED, () => {
        if (sessionId !== sessionIdRef.current) return
        console.log('🎤 STT session started')

        // ⏱️ watchdog: expect speech soon
        firstSpeechTimeoutRef.current = window.setTimeout(() => {
          if (!activeRef.current) return
          console.error('❌ No audio detected — mic likely blocked/suspended')
          // stop()
        }, 3000)
      })

      connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, 
        (data: TranscriptEvent) => {
          if (sessionId !== sessionIdRef.current || pausedRef.current) return

          // clear it on the 1st partial:
          if (firstSpeechTimeoutRef.current) {
            clearTimeout(firstSpeechTimeoutRef.current)
            firstSpeechTimeoutRef.current = null
          }

          onPartialText?.(data.text)
        }
      )

      connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, 
        (data: TranscriptEvent) => {
          if (sessionId !== sessionIdRef.current || pausedRef.current) return

          const text = data.text?.trim()
          if (!text) return
          onFinalText?.(text) // optional now
        }
      )

      connection.on(RealtimeEvents.ERROR, 
        (err: ScribeErrorMessage) => {
          // Ignore errors caused by intentional stop
          if (
            stoppingRef.current || 
            sessionId !== sessionIdRef.current ||
            !activeRef.current // never fully connected
          ) {
            console.log('STT transient error (ignored)')
            return
          }

          console.error('❌ STT error:', err)
          cleanup()
        }
      )

      connection.on(RealtimeEvents.CLOSE, () => {
        if (sessionId !== sessionIdRef.current) return
        console.log('🎤 STT closed')
        cleanup()
      })
    } catch (err) {
      console.error('❌ STT start failed:', err)
      cleanup()
    }
  }, [cleanup, onFinalText, onPartialText])

  // ---- HARD STOP (TEARDOWN ONLY) ----
  const stop = useCallback(() => {
    if (!connectionRef.current) return

    console.log('🛑 STT stopping...')
    stoppingRef.current = true
    sessionIdRef.current++ // invalidate all handlers

    try {
      connectionRef.current.close()
    } catch {}

    cleanup()
  }, [cleanup])

  // ---- LOGICAL GATING ----
  const pause = useCallback(() => {
    pausedRef.current = true
    console.log('⏸️ STT paused')
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
    console.log('▶️ STT resumed')
  }, [])

  // ---- unmount cleanup (CRITICAL) ----
  useEffect(() => {
    return () => {
      sessionIdRef.current++
      try {
        connectionRef.current?.close()
      } catch {}
      cleanup()
    }
  }, [cleanup])

  return { start, stop, pause, resume, isConnected }
}