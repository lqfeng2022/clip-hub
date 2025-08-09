import { Image, CardBody, Heading, Text, HStack, Avatar, Box, Card, AspectRatio } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Clip from '@/entities/Clip'
import useLanguageStore from '@/languageStore'
import { pocketURL } from '@/services/pocket'

const ClipCard = ({ clip }: { clip: Clip }) => {
  const lang = useLanguageStore(s => s.language)
  
  const header = lang === 'ch' && clip.title_ch ? clip.title_ch : clip.title
  const genre_title = lang === 'en' ? clip.genre.title : clip.genre.title_ch
  const original = lang === 'ch' && clip.original_ch ? clip.original_ch : clip.original

  return (
    <Card bg='gray.800' borderRadius={12} overflow='hidden' variant='unstyled'>
      <AspectRatio ratio={16/9}>
        <Image src={`${pocketURL}${clip.cover}`} className='img-hover' />
      </AspectRatio>
      <CardBody p='12px 4px'>
        <HStack align='flex-start' wrap='wrap' spacing={4}>
          <Avatar
            size='sm'
            src={`${pocketURL}${clip.genre.image}`}
            alignSelf='flex-start'
            flexShrink={0}
          />
          <Box flex='1' minW={0}>
            <Heading fontSize='lg' noOfLines={2} _hover={{color: 'yellow'}}>
              <Link to={'/clips/' + clip.slug}>
                {header}
              </Link>
            </Heading>
            <Text as='b' py={1} fontSize='sm' color='yellow.200'>
              {genre_title}
            </Text>
            <HStack>
              <Text mr={3}>{clip.release_year}</Text>
              <Text as='b' noOfLines={1}>{original}</Text>
            </HStack>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default ClipCard