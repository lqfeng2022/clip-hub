import { AspectRatio, Box, Button, Divider, Heading, HStack, Image, List, ListItem } from '@chakra-ui/react'
import useGenres from '@/hooks/store/useGenres'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'
import { pocketURL } from '@/services/pocket'
import BeatLoader from '../BeatLoader'

const GenreList = () => {
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)
  
  const lang = useLanguageStore((s) => s.language)
  const title = lang === 'en' ? 'Clip genres' : '视频类别'
  
  const { data, error, isLoading } = useGenres()
  
  if (error) return null
  if (isLoading) return <BeatLoader />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' py={3}>
        {title}
      </Heading>
      <List py={1}>
        {data?.results.map((genre) => (
          <ListItem py='8px' key={genre.id}>
            <HStack spacing={4}>
              <AspectRatio w='60px' ratio={9 / 6}>
                <Image
                  objectFit='cover'
                  borderRadius={9}
                  src={`${pocketURL}${genre.image}`}
                />
              </AspectRatio>
              <Button
                whiteSpace='normal'
                textAlign='left'
                fontWeight={
                  genre.id === selectedGenreId ? 'bold' : 'normal'
                }
                onClick={() => setSelectedGenreId(genre.id)}
                fontSize='md'
                variant='link'
                _hover={{textDecoration: 'none'}}
              >
                {lang === 'en' ? genre.title : genre.title_ch}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default GenreList