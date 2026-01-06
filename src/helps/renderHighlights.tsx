import { Text } from '@chakra-ui/react'

// escape regex special characters
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// normalize curly quotes so “I’m” == "I'm"
function normalizeQuotes(str: string) {
  return str.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
}

export function renderHighlights(text: string, phrases: string[]) {
  // normalize both sides
  const normalizedText = normalizeQuotes(text)
  const normalizedPhrases = phrases.map(normalizeQuotes).filter(p => p.length > 0)

  // Sort phrases longest -> shortest to avoid overlaps
  const sorted = [...normalizedPhrases].sort((a, b) => b.length - a.length)

  // Build regex only when we have phrases to highlight
  const hasHighlights = sorted.length > 0
  const regex = hasHighlights ? new RegExp(`(${sorted.map(escapeRegex).join('|')})`, 'gi') : null
  const lines = normalizedText.split('\n')

  // Do the text start with '-' or not
  const hasBullet = lines.some(l => l.trim().startsWith('-'))

  return (
    <>
      {lines.map((line, lineIndex) => {
        const isBullet = line.trim().startsWith('-')
        return (
          <Text 
            key={lineIndex}
            fontSize='sm'
            color='gray.100'
            lineHeight='1.4'
            pl={hasBullet ? (isBullet ? 0 : '10px') : undefined}
          >
            {hasHighlights
              ? line.split(regex as RegExp).map((part, i) =>
                  sorted.some(p => part.toLowerCase() === p.toLowerCase())
                    ? (
                      <Text 
                        key={i}
                        as='span'
                        fontWeight='bold'
                        color='yellow.200'
                      >
                        {part}
                      </Text>
                    ) : (
                      <Text key={i} as='span'>{part}</Text>
                    )
                )
              : <Text as='span'>{line}</Text>
            }
          </Text>
        )
      }
      )}
    </>
  )
}