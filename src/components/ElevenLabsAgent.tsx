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
    <elevenlabs-convai 
      agent-id="agent_5601kgphw3x1ezwb0fsq50n40fnd"
    >
    </elevenlabs-convai>
  )
}

export default ElevenLabsAgent