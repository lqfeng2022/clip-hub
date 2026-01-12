import { Text, Box } from '@chakra-ui/react'

export function renderHighlights(text: string, phrases: string[]) {
  const normalizedText = normalizeQuotes(text)
  const normalizedPhrases = phrases.map(normalizeQuotes).filter(Boolean)

  const sortedPhrases = [...normalizedPhrases].sort((a, b) => b.length - a.length)

  const regex = sortedPhrases.length > 0 
    ? new RegExp(`(${sortedPhrases.map(escapeRegex).join('|')})`, 'gi')
    : null

  const lines = normalizedText.split('\n')
  const hasBullet = lines.some(l => l.trim().startsWith('-'))

  return (
    <>
      {lines.map((line, index) => {
        const isBullet = line.trim().startsWith('-')
        
        // Handle blank line explicitly
        if (line.trim() === '')
          return <Box key={index} height="0.8em"/>

        return (
          <Text
            key={index}
            fontSize="md"
            color="gray.100"
            lineHeight="1.4"
            pl={hasBullet ? (isBullet ? 0 : '10px') : undefined}
          >
            {splitByAsterisks(line).map((segment, segIndex) =>
              isStarBold(segment) ? (
                <Text key={segIndex} as="span" fontWeight="bold">
                  {stripAsterisks(segment)}
                </Text>
              ) : (
                <Text key={segIndex} as="span">
                  {renderHighlightedText(segment, sortedPhrases, regex)}
                </Text>
              )
            )}
          </Text>
        )
      })}
    </>
  )
}

function renderHighlightedText(text: string, phrases: string[], regex: RegExp | null) {
  if (!regex || phrases.length === 0)
    return <Text as="span">{text}</Text>

  return text.split(regex).map((part, i) =>
    phrases.some(p => part.toLowerCase() === p.toLowerCase()) 
      ? <Text key={i} as="span" fontWeight="bold" color="yellow.200">{part}</Text>
      : <Text key={i} as="span">{part}</Text>
  )
}

// escape regex special characters
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normalizeQuotes(str: string) {
  return str.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
}

function splitByAsterisks(text: string) {
  return text.split(/(\*[^*]+\*)/g)
}

function isStarBold(segment: string) {
  return segment.startsWith('*') && segment.endsWith('*')
}

function stripAsterisks(segment: string) {
  return segment.slice(1, -1)
}