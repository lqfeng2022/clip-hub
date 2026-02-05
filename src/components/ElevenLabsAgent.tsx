import { useEffect } from 'react'

const ElevenLabsAgent = () => {
  useEffect(() => {
    // avoid injecting script multiple times
    if (document.getElementById('elevenlabs-convai-script')) return

    const script = document.createElement('script')
    script.id = 'elevenlabs-convai-script'
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
    script.async = true
    script.type = 'text/javascript'

    document.body.appendChild(script)
  }, [])

  return (
    <elevenlabs-convai agent-id="agent_6401kfq44hxheev9g2m0yb3dt4ds">
    </elevenlabs-convai>
  )
}

export default ElevenLabsAgent