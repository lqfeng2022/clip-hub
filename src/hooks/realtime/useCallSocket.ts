// hooks/realtime-call/useCallSocket.ts
import { ClientEvent, ServerEvent } from '@/protocol/call'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  callId: string
  onServerEvent?: (type: ServerEvent, data?: any) => void
}
export function useCallSocket({ callId, onServerEvent }: Props) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const handlerRef = useRef(onServerEvent)

  handlerRef.current = onServerEvent

  const sendEvent = useCallback((type: ClientEvent, data?: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, data }))
    }
  }, [])

  useEffect(() => {
    if (!callId || wsRef.current) return // Only create once

    const ws = new WebSocket(`wss://clipwords.me/ws/call/${callId}/`)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('✅ Call WS connected')
      setConnected(true)
    }

    ws.onmessage = (ev) => {
      try {
        const { type, data } = JSON.parse(ev.data)
        handlerRef.current?.(type, data)
        console.log('WS message:', data)
      } catch (err) {
        console.error('WS parse error:', err)
      }
    }

    ws.onclose = () => {
      console.log('🔌 Call WS closed')
      setConnected(false)
      wsRef.current = null
    }

    ws.onerror = (err) => {
      console.error('❌ WS error', err)
      handlerRef.current?.(ServerEvent.ERROR, { 
        message: 'Call WebSocket error' 
      })
    }

    return () => {
      // 👇 only close if still open
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [callId])

  return { connected, sendEvent }
}