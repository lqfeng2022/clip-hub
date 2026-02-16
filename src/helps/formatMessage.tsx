// src/helps/formatMessage.tsx
export const formatMessage = (content: string) => {
  if (!content) return content

  let formatted = content

  // 1. Collapse double hyphens (--) → single em-dash
  formatted = formatted.replace(/--/g, '—')

  // 2. Collapse repeated full-width em-dashes (—— or — —) → single —
  formatted = formatted.replace(/—{2,}|\—\s+—/g, '—')

  // 3. Fix English em-dash spacing (a—b → a — b)
  // Only add spacing if both sides are ASCII letters/numbers
  formatted = formatted.replace(/([A-Za-z0-9])—([A-Za-z0-9])/g, '$1 — $2')

  // 4. Split by bold first (**text**)
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