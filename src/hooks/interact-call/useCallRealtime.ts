// hooks/realtime-call/useRealtimeCall.ts
import { useTTSAudioPlayer } from './useTTSAudioPlayer'
import { useCallSocket } from './useCallSocket'
import { useCallStateMachine } from './useCallStateMachine'
import { useSTTController } from './useSTTController'
import { useTTSController } from './useTTSController'
import { useCallLifecycle } from './useCallLifecycle'
import { ServerEvent } from '@/protocol/call'
import Host from '@/entities/Host'

export function useCallRealtime(callId: string, host: Host) {
  const audio = useTTSAudioPlayer()

  // ---- STATE ----
  const { state, transitionTo } = useCallStateMachine({
    isTTSEnabled: () => tts.isPlaying(),
  })

  // ---- SOCKET (transport layer) ----
  const { connected, sendEvent } = useCallSocket({
    callId,
    onServerEvent: (type, data) => {
      switch (type) {
        case ServerEvent.AGENT_STATE:
          transitionTo(data.state)
          break

        case ServerEvent.AGENT_TEXT:
          if (data?.text) {
            tts.start(data.text)
          }
          break
      }
    },
  })

  // ---- TTS ----
  const tts = useTTSController({
    hostSlug: host.slug,
    audio,
    transitionTo,
  })

  // ---- STT ----
  const stt = useSTTController({
    state,
    transitionTo,
    sendEvent,
    tts,
  })

  // ---- LIFECYCLE ----
  const { duration, endCall } = useCallLifecycle({
    connected,
    sendEvent,
    stt,
    tts,
  })

  return {
    connected,
    duration,
    endCall,
    callBlockReason: stt.callBlockReason,
  }
}