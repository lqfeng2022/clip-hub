import lamejs from 'lamejs'

export function encodePCMToMP3(
  buffers: Float32Array[],
  sampleRate: number,
  kbps = 64
): Blob {
  const encoder = new lamejs.Mp3Encoder(1, sampleRate, kbps)
  const parts: BlobPart[] = []

  for (const buffer of buffers) {
    const pcm16 = new Int16Array(buffer.length)
    for (let i = 0; i < buffer.length; i++) {
      pcm16[i] = Math.max(-1, Math.min(1, buffer[i])) * 0x7fff
    }

    const mp3buf = encoder.encodeBuffer(pcm16)
    if (mp3buf.length > 0) {
      parts.push(mp3buf as unknown as BlobPart)
    }
  }

  const end = encoder.flush()
  if (end.length > 0) {
    parts.push(end as unknown as BlobPart)
  }

  return new Blob(parts, { type: 'audio/mpeg' })
}