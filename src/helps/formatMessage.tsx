// src/helps/formatMessage.tsx
export const formatMessage = (content: string) => {
  if (!content) return content

  // 1.Fix em-dash spacing
  let formatted = content.replace(/(\S)—(\S)/g, '$1 — $2')

  // 2.Split by bold first (**text**)
  const boldSplit = formatted.split(/(\*\*.*?\*\*)/g)

  return boldSplit.map((part, i) => {
    // Handle **bold**
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2)
      return <strong key={`b-${i}`}>{boldText}</strong>
    }

    // Handle *italic* inside normal text
    const italicSplit = part.split(/(\*.*?\*)/g)

    return italicSplit.map((subPart, j) => {
      if (subPart.startsWith('*') && subPart.endsWith('*')) {
        const italicText = subPart.slice(1, -1)
        return <em key={`i-${i}-${j}`}>{italicText}</em>
      }
      return subPart
    })
  })
}