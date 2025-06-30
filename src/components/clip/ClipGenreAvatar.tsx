import Clip from '@/entities/Clip'
import Genre from '@/entities/Genre'
import useLanguageStore from '@/languageStore'
import { Avatar, Box, HStack, Text } from '@chakra-ui/react'

const ClipGenreAvatar = ({ genre }: { genre: Genre }) => {
  const lang = useLanguageStore(s => s.language)
  const title = lang === 'en' ? genre.title : genre.title_ch

  return (
    <HStack align='flex-start' wrap='wrap' spacing={4}>
      <Avatar
        size='md'
        src={genre.image}
        alignSelf='flex-start'
        flexShrink={0}
      />
      <Box flex='1' minW={0}>
        <Text as='b' py={1} fontSize='lg' color='yellow.200'>
          {title}
        </Text>
        <Text fontSize='sm' color='gray'>356 clips</Text>
      </Box>
    </HStack>
  )
}

export default ClipGenreAvatar