export function truncate(text: string, maxLength: number): string {
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