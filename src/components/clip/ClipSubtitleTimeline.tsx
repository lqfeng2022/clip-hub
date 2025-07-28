import { Subtitle } from '@/entities/Subtitle'
import { Avatar, AvatarGroup, Box, HStack, Tag, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


interface Props {
  subtitle: Subtitle,
  handleJump: (tl: string) => void
}
const ClipSubtitleTimeline = ({ subtitle, handleJump}: Props) => {
  const renderExpressions = () => {
    const { content, expressions } = subtitle
    if (expressions.length === 0) return content

    // Build a RegExp pattern to match all expression texts
    const pattern = new RegExp(`(${expressions.map(
      e => escapeRegExp(e.title)).join('|')})`, 'gi')

    const parts = content.split(pattern)

    return parts.map((part, i) => {
      const match = expressions.find(
        e => e.title.toLowerCase() === part.toLowerCase())

      return match 
        ? <Link to={'/expressions/' + match.slug}>
            <Text
              as='strong'
              key={i}
              color='yellow.200'
              fontSize='xl'
              cursor='pointer'
            >
              {part}
            </Text>
          </Link> : part
    })
  }
  
  // Escape special regex characters in expression text
  const escapeRegExp = (text: string) =>
    text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return (
    <Box>
      <HStack justifyContent='space-between'>
        <HStack>
          <AvatarGroup>
            {subtitle.characters.map((character) =>
              <Avatar
                size='small'
                fontWeight='bold'
                name={character.name}
                src={character?.portrait ? character.portrait : ''}
              />
            )}
          </AvatarGroup>
          {subtitle.characters.map((character) =>
            <Tag>{character.name}</Tag>
          )}
        </HStack>
        <Tag 
          size='lg'
          cursor='pointer'
          fontWeight='bold'
          onClick={() => handleJump(subtitle.timeline)}
        >
          {subtitle.timeline}
        </Tag>
      </HStack>
      <Box pt={2}>{renderExpressions()}</Box>
    </Box>
  )
}

export default ClipSubtitleTimeline