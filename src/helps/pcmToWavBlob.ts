/**
 * Wrap raw PCM16 chunk into a WAV Blob for immediate playback
 * @param pcmChunk ArrayBuffer of PCM16 (16-bit little endian) samples
 * @param sampleRate Sample rate in Hz (e.g., 22050, 44100)
 */
export function pcmToWavBlob(pcmChunk: ArrayBuffer, sampleRate = 22050): Blob {
  const numChannels = 1
  const bytesPerSample = 2
  const dataSize = pcmChunk.byteLength
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  let offset = 0

  function writeString(str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset++, str.charCodeAt(i))
    }
  }

  function writeUint32(val: number) {
    view.setUint32(offset, val, true)
    offset += 4
  }

  function writeUint16(val: number) {
    view.setUint16(offset, val, true)
    offset += 2
  }

  // ---- WAV header ----
  writeString('RIFF')
  writeUint32(36 + dataSize) // file size - 8
  writeString('WAVE')
  writeString('fmt ')
  writeUint32(16) // fmt chunk size
  writeUint16(1) // PCM format
  writeUint16(numChannels)
  writeUint32(sampleRate)
  writeUint32(sampleRate * numChannels * bytesPerSample) // byte rate
  writeUint16(numChannels * bytesPerSample) // block align
  writeUint16(16) // bits per sample
  writeString('data')
  writeUint32(dataSize)

  // ---- PCM data ----
  new Uint8Array(buffer, 44).set(new Uint8Array(pcmChunk))

  return new Blob([buffer], { type: 'audio/wav' })
}