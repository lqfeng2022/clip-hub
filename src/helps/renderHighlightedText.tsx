import { Text } from '@chakra-ui/react'

export function renderHighlightedText(text: string, phrases: string[], regex: RegExp | null) {
  if (!regex || phrases.length === 0)
    return <Text as="span">{text}</Text>

  return text.split(regex).map((part, i) =>
    phrases.some(p => part.toLowerCase() === p.toLowerCase()) 
      ? <Text key={i} as="span" fontWeight="bold" color="yellow.200">{part}</Text>
      : <Text key={i} as="span">{part}</Text>
  )
}