import { useEffect, useState } from 'react'

export default function useMicReady(initial = true) {
  const [micReady, setMicReady] = useState<boolean>(initial)

  useEffect(() => {
    if (!(navigator as any).permissions) {
      setMicReady(true)
      return
    }

    let mounted = true
    let statusRef: any = null

    ;(navigator as any).permissions.query({ name: 'microphone' })
      .then((status: any) => {
        if (!mounted) return
        statusRef = status
        setMicReady(status.state === 'granted')
        status.onchange = () => {
          if (!mounted) return
          setMicReady(status.state === 'granted')
        }
      })
      .catch(() => {
        setMicReady(true)
      })

    return () => {
      mounted = false
      if (statusRef) statusRef.onchange = null
    }
  }, [])

  return micReady
}