import { useCallback, useState } from 'react'
import { CallState } from '@/types/call'

interface Props {
  isTTSEnabled: () => boolean
}
export function useCallStateMachine({ isTTSEnabled }: Props) {
  const [state, setState] = useState<CallState>('idle')

  const transitionTo = useCallback((next: CallState) => {
    setState((prev) => {
      if (prev === next) return prev

      console.log(`🔥 state: ${prev} → ${next}`)

      // ONLY STATE LOGIC (NO STT SIDE EFFECTS HERE)
      if (next === 'thinking') {
        // optional: semantic only
      }

      if (next === 'speaking') {
        // semantic only
      }

      return next
    })
  }, [])

  return { state, transitionTo }
}