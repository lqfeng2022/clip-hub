// hooks/realtime-call/useRealtimeCall.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClientEvent, ServerEvent } from '@/protocol/call'
import { useAudioPlayer } from './useAudioPlayer'
import { useCallSocket } from './useCallSocket'
import { useRealtimeSTT } from './useRealtimeSTT'
import { useTTSSocket } from './useTTSSocket'
import Host from '@/entities/Host'

const CALL_STATES = ['idle', 'thinking', 'speaking'] as const
type CallState = typeof CALL_STATES[number]

function isCallState(value: any): value is CallState {
  return typeof value === 'string' && CALL_STATES.includes(value as CallState)
}

type CallBlockReason =
  | null
  | 'mic-unavailable'
  | 'permission-denied'
  | 'device-muted'

export function useCallRealtime(callId: string, host: Host) {
  const [duration, setDuration] = useState(0)
  
  const [agentState, setAgentState] = useState<CallState>('idle')

  const [callBlockReason, setCallBlockReason] = useState<CallBlockReason>(null)

  const timerRef = useRef<number | null>(null)
  const endedRef = useRef(false)
  const callStartedRef = useRef(false) // start call lifecycle only

  const sttStartedRef = useRef(false) // stt active deteck
  
  const audio = useAudioPlayer()

  const ttsPlayingRef = useRef(false) // track tts state
  const isTTSEnabled = () => ttsPlayingRef.current

  // ---- STT ----
  const stt = useRealtimeSTT({
    onPartialText: (text) => {
      // 🔥 barge-in
      if (agentState === 'speaking') {
        tts.stop()    // stop producer FIRST
        audio.reset() // then kill playback
        stt.resume()  // 🔥 user takes floor
      }

      // 🧠 stream partial transcript to agent
      try {
        sendEvent(ClientEvent.TEXT_PARTIAL, { 
          text, 
          ts: Date.now() 
        })
        console.log('text_partial:', text)
      } catch (err) {
        console.warn('Failed to send partial text:', err)
      }
    },

    onFinalText: (text) => {
      // ✅ authoritative commit from STT
      try {
        sendEvent(ClientEvent.TEXT_FINAL, { 
          text, 
          ts: Date.now() 
        })
        console.log('text_final:', text)
      } catch (err) {
        console.warn('Failed to send final text:', err)
      }
    },
  })

  // ---- TTS ----
  const tts = useTTSSocket({
    hostSlug: host.slug, // 🔑 pass host.slug here
    
    onAudioChunk: (chunk) => {
      audio.push(chunk) // chunk is ArrayBuffer PCM16
    },

    onEnd: () => {
      ttsPlayingRef.current = false
      console.log('🧪 TTS ended')

      // explicitly resume STT after TTS
      if (sttStartedRef.current) {
        console.log('▶️ Resuming STT after TTS ended')
        stt.resume()
      }

      setAgentState('idle')
    },

    onError: () => {
      ttsPlayingRef.current = false
      console.warn('TTS error')
      audio.reset() // stop playback
      setAgentState('idle')
    },
  })

  // ---- call socket ----
  const { connected, sendEvent } = useCallSocket({
    callId,
    onServerEvent: (type, data) => {
      switch (type) {
        case ServerEvent.AGENT_STATE: {
          const state = data?.state

          if (!isCallState(state)) {
            console.warn('Invalid AGENT_STATE payload:', data)
            return
          }

          setAgentState(state)

          if (state === 'thinking' || state === 'speaking') {
            stt.pause()
          }

          // 🔑 only resume STT if TTS is not currently playing
          if (state === 'idle' && !isTTSEnabled()) {
            stt.resume()
          }

          break
        }

        case ServerEvent.AGENT_TEXT:
          // TEST: trigger TTS playback (stub)
          if (typeof data?.text === 'string') {
            if (ttsPlayingRef.current) {
              console.log('🛑 TTS already playing, ignoring new text')
              return
            }
            console.log('🧪 AGENT_TEXT received, start TTS:', data.text)
            ttsPlayingRef.current = true // set BEFORE starting
            tts.start(data.text)
          }
          break

        case ServerEvent.ERROR:
          console.error('Call error:', data)
          break
      }
    },
  })

  // ---- timer helpers ----
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
  }, []
  )

  // ---- Open mic & start STT ----
  const openMicAndStartSTT = useCallback(async () => {
    if (endedRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      })
      const track = stream.getAudioTracks()[0]

      // Mic issue diagnostics:
      console.log('🎤 mic diagnostics', {
        readyState: track.readyState,
        muted: track.muted,
        enabled: track.enabled,
        label: track.label,
      })

      if (!track || track.readyState !== 'live') {
        setCallBlockReason('mic-unavailable')
        throw new Error('Microphone unusable')
      }

      if (track.muted) {
        setCallBlockReason('device-muted')
        throw new Error('Microphone muted by system')
      }

      setCallBlockReason(null) // healthy path
      console.log('🎤 Microphone ready, starting STT and timer')
      
      // 🔑 ONLY start once
      if (!sttStartedRef.current) {
        console.log('🎤 Starting STT (first time)')
        stt.start()
        sttStartedRef.current = true
      }

      startTimer()
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        setCallBlockReason('permission-denied')
      }

      console.warn('❌ Microphone / STT unavailable:', err)

      // sendEvent(ClientEvent.CALL_END) // optional: end call explicitly
    }
  }, [stt, startTimer])

  // ---- SINGLE teardown path ----
  const teardownCall = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true

    console.log('Call teardown')

    // protocol (best effort)
    try {
      sendEvent(ClientEvent.CALL_END)
    } catch {}

    stt.stop() // stop producers
    tts.stop() // stop producers
    audio.reset() // stop consumers
    stopTimer() // local state
  }, [sendEvent, stt, tts, audio, stopTimer])

  // ---- connection lifecycle ----
  useEffect(() => {
    if (!connected || endedRef.current || callStartedRef.current) return

    callStartedRef.current = true
    console.log('☎️ Call connected')

    openMicAndStartSTT() // one time
  }, [connected, openMicAndStartSTT])

  // ---- public API ----
  const endCall = useCallback(() => {
    teardownCall()
  }, [teardownCall])

  return { 
    connected, 
    duration, 
    endCall,
    callBlockReason,
  }
}