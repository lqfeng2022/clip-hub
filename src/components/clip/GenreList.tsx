import { AspectRatio, Box, Button, Divider, Heading, HStack, Image, List, ListItem, Spinner } from '@chakra-ui/react'
import useGenres from '@/hooks/store/useGenres'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'

const GenreList = () => {
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)
  
  const lang = useLanguageStore((s) => s.language)
  const title = lang === 'en' ? 'Clip genres' : '视频类别'
  
  const { data, error, isLoading } = useGenres()
  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' pb={3}>
        {title}
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem py='6px' key={genre.id}>
            <HStack spacing={4}>
              <AspectRatio w='70px' ratio={9 / 6}>
                <Image
                  objectFit='cover'
                  borderRadius={5}
                  src={genre.image}
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