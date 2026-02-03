// src/Playground.tsx
import { useEffect, useRef, useState } from 'react'

const Playground = () => {
  console.log('🧩 Playground render')
  
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bufferQueueRef = useRef<Float32Array[]>([])
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const playingRef = useRef(false)

  const [log, setLog] = useState<string[]>([])

  const pushChunk = (chunk: ArrayBuffer) => {
    // ensure even length
    if (chunk.byteLength % 2 !== 0) {
      chunk = chunk.slice(0, chunk.byteLength - 1)
    }

    const pcm16 = new Int16Array(chunk)
    const float32 = new Float32Array(pcm16.length)
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768
    }

    // log chunk info
    const min = Math.min(...pcm16)
    const max = Math.max(...pcm16)
    setLog((l) => [...l, `pcm16 min/max: ${min} ${max}, length: ${pcm16.length}`])

    bufferQueueRef.current.push(float32)
    playNext()
  }

  const playNext = () => {
    if (!audioCtxRef.current || playingRef.current) return
    const nextChunk = bufferQueueRef.current.shift()
    if (!nextChunk) return

    const ctx = audioCtxRef.current
    const buffer = ctx.createBuffer(1, nextChunk.length, ctx.sampleRate) // use real AudioContext sampleRate
    buffer.getChannelData(0).set(nextChunk)

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    source.onended = () => {
      playingRef.current = false
      playNext()
    }
    source.start()
    sourceRef.current = source
    playingRef.current = true
  }

  const startTTS = async (text: string) => {
    // 🔑 must be inside user gesture
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume()
      console.log('AudioContext resumed')
    }

    const ws = new WebSocket('ws://localhost:5179/ws/tts')
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws

    ws.onopen = () => {
      console.log('Debug TTS WS connected')
      ws.send(JSON.stringify({ type: 'tts.start', text }))
    }

    ws.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        pushChunk(e.data)
        return
      }
    }

    ws.onerror = (err) => console.error('TTS WS error', err)
  }

  const stopTTS = () => {
    wsRef.current?.close()
    bufferQueueRef.current = []
    sourceRef.current?.stop()
    sourceRef.current = null
    playingRef.current = false
  }

  useEffect(() => {
    console.log('🟢 Playground mounted')

    const ws = new WebSocket('ws://localhost:5179/ws/tts')
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws

    ws.onopen = () => {
      console.log('🟢 TTS WS open')
      ws.send(JSON.stringify({
        type: 'tts.start',
        text: 'Hello. This is an automatic TTS test.'
      }))
    }

    ws.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        console.log('🔊 audio chunk', e.data.byteLength)
        pushChunk(e.data)
        return
      }

      try {
        const msg = JSON.parse(e.data)
        console.log('📨 WS msg', msg)
      } catch {}
    }

    ws.onerror = (e) => console.error('❌ WS error', e)
    ws.onclose = (e) => console.log('🔴 WS closed', e.code)

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <button onClick={() => {
        console.log('🔥 BUTTON CLICKED')
        startTTS('Hello, this is a test of TTS.')
      }
        }>
        Start TTS
      </button>
      <button onClick={stopTTS}>Stop TTS</button>
      <div style={{ marginTop: 10 }}>
        <strong>Logs:</strong>
        <div style={{ maxHeight: 200, overflow: 'auto', fontFamily: 'monospace' }}>
          {log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  )
}

export default Playground