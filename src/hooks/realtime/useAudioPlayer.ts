// hooks/realtime-call/useAudioPlayer.ts
import { useRef, useCallback, useEffect } from 'react'

export function useAudioPlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  // ---- PCM byte re-framing ----
  const pcmByteQueueRef = useRef<Uint8Array>(new Uint8Array(0))

  // ---- playback queue ----
  const bufferQueueRef = useRef<Float32Array[]>([])
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)

  const nextTimeRef = useRef(0)

  useEffect(() => {
    audioCtxRef.current = new AudioContext()
    return () => {
      audioCtxRef.current?.close()
    }
  }, [])

  // ---- resample 22050 → AudioContext.sampleRate ----
  const resamplePCM = useCallback((pcm: Int16Array) => {
    const ctx = audioCtxRef.current
    if (!ctx) return new Float32Array()

    const sourceRate = 22050
    const targetRate = ctx.sampleRate

    // PCM16 → Float32
    const float32 = new Float32Array(pcm.length)
    for (let i = 0; i < pcm.length; i++) {
      float32[i] = pcm[i] / 32768
    }

    if (sourceRate === targetRate) return float32

    // linear interpolation
    const ratio = targetRate / sourceRate
    const outLength = Math.floor(float32.length * ratio)
    const out = new Float32Array(outLength)

    for (let i = 0; i < outLength; i++) {
      const srcIdx = i / ratio
      const idx = Math.floor(srcIdx)
      const frac = srcIdx - idx
      const s0 = float32[idx] ?? 0
      const s1 = float32[idx + 1] ?? s0
      out[i] = s0 + (s1 - s0) * frac
    }

    return out
  }, [])

  const playNext = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    while (bufferQueueRef.current.length > 0) {
      const chunk = bufferQueueRef.current.shift()!

      const buffer = ctx.createBuffer(1, chunk.length, ctx.sampleRate)
      buffer.getChannelData(0).set(chunk)

      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(ctx.destination)

      const startTime = Math.max(nextTimeRef.current, ctx.currentTime)
      source.start(startTime)

      nextTimeRef.current = startTime + buffer.duration
    }
  }, [])

  // ---- MAIN ENTRY: push raw PCM bytes ----
  const push = useCallback(
    (chunk: ArrayBuffer) => {
      // append bytes
      const incoming = new Uint8Array(chunk)
      const queued = pcmByteQueueRef.current

      const merged = new Uint8Array(queued.length + incoming.length)
      merged.set(queued, 0)
      merged.set(incoming, queued.length)
      pcmByteQueueRef.current = merged

      // only decode full samples (2 bytes per sample)
      const usableBytes = merged.length - (merged.length % 2)
      if (usableBytes === 0) return

      const pcm16 = new Int16Array(
        merged.buffer,
        merged.byteOffset,
        usableBytes / 2
      )

      // keep leftover byte (if any)
      pcmByteQueueRef.current = merged.slice(usableBytes)

      const float32 = resamplePCM(pcm16)
      if (float32.length === 0) return

      bufferQueueRef.current.push(float32)
      playNext()
    },
    [playNext, resamplePCM]
  )

  const reset = useCallback(() => {
    bufferQueueRef.current = []
    pcmByteQueueRef.current = new Uint8Array(0)
    nextTimeRef.current = 0

    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch {}
      sourceRef.current = null
    }
  }, [])

  return { push, reset }
}