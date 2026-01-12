export function truncateAtWord(text: string, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text

  // cut the string at maxLength
  let truncated = text.slice(0, maxLength)

  // try to keep the last word whole
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  if (lastSpaceIndex > 0) {
    truncated = truncated.slice(0, lastSpaceIndex)
  }

  // remove only trailing punctuation or dashes
  truncated = truncated.replace(/[\s\-.,;:!?]+$/g, '')

  return truncated + '…'
}

export function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function normalizeQuotes(str: string) {
  return str.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
}

export function splitByAsterisks(text: string) {
  return text.split(/(\*[^*]+\*)/g)
}

export function isStarBold(segment: string) {
  return segment.startsWith('*') && segment.endsWith('*')
}

export function stripAsterisks(segment: string) {
  return segment.slice(1, -1)
}