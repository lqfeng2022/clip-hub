import { Text, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { escapeRegex, isStarBold, normalizeQuotes, splitByAsterisks, stripAsterisks, truncateAtWord } from './textWorker'
import { renderHighlightedText } from './renderHighlightedText'

interface Options {
  linkTo?: string
  maxLength?: number
}
export function renderHighlights(text: string, phrases: string[], options: Options = {}) {
  const { linkTo, maxLength = 400 } = options
  const [expanded, setExpanded] = useState(false)

  const isLongText = text.length > maxLength
  const displayText = !expanded && isLongText
    ? truncateAtWord(text, maxLength)
    : text

  const normalizedText = normalizeQuotes(displayText)
  const normalizedPhrases = phrases.map(normalizeQuotes).filter(Boolean)
  const sortedPhrases = [...normalizedPhrases].sort((a, b) => b.length - a.length)

  const regex = sortedPhrases.length
    ? new RegExp(`(${sortedPhrases.map(escapeRegex).join('|')})`, 'gi')
    : null

  const lines = normalizedText.split('\n')
  const hasBullet = lines.some(l => l.trim().startsWith('-'))

  const Content = (
    <>
      {lines.map((line, index) => {
        if (line.trim() === '')
          return <Box key={index} height="0.8em" />

        const isBullet = line.trim().startsWith('-')

        return (
          <Text
            key={index}
            fontSize="sm"
            color="gray.100"
            lineHeight="1.4"
            pl={hasBullet && !isBullet ? '10px' : undefined}
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

  return (
    <Box>
      {linkTo ? <Link to={linkTo} style={{ textDecoration: 'none' }}>
          {Content}
        </Link> : Content
      }
      {isLongText && (
        <Button
          size="xs"
          variant="ghost"
          p={0}
          color="blue.300"
          onClick={() => setExpanded(!expanded)}
          _hover={{ bg: 'transparent', color: 'blue.100' }}
          _active={{ bg: 'transparent' }}
          _focusVisible={{ boxShadow: 'none' }}
        >
          Show {expanded ? 'Less' : 'More'}
        </Button>
      )}
    </Box>
  )
}