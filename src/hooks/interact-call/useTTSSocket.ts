// hooks/realtime-call/useTTSSocket.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClientEvent, ServerEvent } from '@/protocol/tts'

interface Props {
  hostSlug: string
  onAudioChunk: (chunk: ArrayBuffer) => void
  onEnd?: () => void
  onError?: (message?: string) => void
}
export function useTTSSocket({ hostSlug, onAudioChunk, onEnd, onError }: Props) {
  const wsRef = useRef<WebSocket | null>(null)
  const audioHandlerRef = useRef(onAudioChunk)
  const stoppingRef = useRef(false)

  const [connected, setConnected] = useState(false)

  audioHandlerRef.current = onAudioChunk

  useEffect(() => {
    if (wsRef.current) return // 🔥 strict-mode safe

    const ws = new WebSocket('wss://clipwords.me/ws/tts')
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws

    ws.onopen = () => {
      console.log('🔊 TTS WS connected')
      stoppingRef.current = false
      setConnected(true)
    }

    ws.onmessage = (e) => {
      // ---- binary audio ----
      if (e.data instanceof ArrayBuffer) {
        audioHandlerRef.current(e.data)
        return
      }

      // ---- control messages ----
      try {
        const msg = JSON.parse(e.data)
        switch (msg.type) {
          case ServerEvent.END:
            onEnd?.()
            break
          case ServerEvent.ERROR:
            onError?.(msg.message)
            break
        }
      } catch {
        // ignore non-JSON
      }
    }

    ws.onerror = (err) => {
      console.error('❌ TTS WS error', err)
      onError?.('WebSocket error')
    }

    ws.onclose = () => {
      console.log('🔌 TTS WS closed')
      stoppingRef.current = false
      wsRef.current = null
      setConnected(false)
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [onEnd, onError])

  // ---- commands ----
  const start = useCallback((text: string) => {
      wsRef.current?.send(JSON.stringify({
        type: ClientEvent.START,
        text,
        hostSlug, // 🔑 send host slug
      }))
  }, [])

  const stop = useCallback(() => {
    const ws = wsRef.current

    if (!ws) return
    if (stoppingRef.current) return
    if (ws.readyState !== WebSocket.OPEN) return

    stoppingRef.current = true
    
    try {
      ws.send(JSON.stringify({ type: ClientEvent.STOP }))
    } catch (err) {
      console.warn('TTS stop ignored:', err)
    }
  }, [])

  return { connected, start, stop }
}