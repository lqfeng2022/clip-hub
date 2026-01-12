import { Text, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function renderHighlights(
  text: string, 
  phrases: string[], 
  productId?: string,
  maxLength = 400
) {
  const [expanded, setExpanded] = useState(false)

  const isLongText = text.length > maxLength
  const displayText = !expanded && isLongText 
    ? truncateAtWord(text, maxLength)
    : text

  const normalizedText = normalizeQuotes(displayText)
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

        if (line.trim() === '')
          return <Box key={index} height="0.8em"/>

        return (
          <Text
            key={index}
            fontSize="sm"
            color="gray.100"
            lineHeight="1.4"
            pl={hasBullet ? (isBullet ? 0 : '10px') : undefined}
          >
            {/* Wrap each line in Link separately */}
            <Link to={`/products/${productId}`}>
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
            </Link>

            {/* Render Show More button only on last line */}
            {index === lines.length - 1 && isLongText && (
              <Button
                size="xs"
                variant="ghost"
                ml="5px"
                color="blue.200"
                p={0}
                onClick={() => setExpanded(!expanded)}
                _hover={{bg: ''}}
              >
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Text>
        )
      })}
    </>
  )
}

// ------------------ helpers ------------------
function renderHighlightedText(text: string, phrases: string[], regex: RegExp | null) {
  if (!regex || phrases.length === 0)
    return <Text as="span">{text}</Text>

  return text.split(regex).map((part, i) =>
    phrases.some(p => part.toLowerCase() === p.toLowerCase()) 
      ? <Text key={i} as="span" fontWeight="bold" color="yellow.200">{part}</Text>
      : <Text key={i} as="span">{part}</Text>
  )
}

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

// truncate text at word boundary
function truncateAtWord(text: string, maxLength: number) {
  if (text.length <= maxLength) return text

  const sliced = text.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(' ')
  if (lastSpace === -1) return sliced // no spaces, just return slice
  return sliced.slice(0, lastSpace)
}