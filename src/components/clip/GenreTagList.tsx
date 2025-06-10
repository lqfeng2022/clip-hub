import { Box, Spinner, Tag, TagLabel } from '@chakra-ui/react'
import useGenres from '@/hooks/store/useGenres'
import useClipQueryStore from '@/clipStore'
import HScrollContainer from '../HScrollContainer'

const GenreTags = () => {
  const { data, error, isLoading } = useGenres()
  
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box py={2}>
      <HScrollContainer
        width='90vw' // '100vw' will right offset, -> '90vw'
      >
        {data?.results.map((genre) => (
          <Tag
            size='lg'
            variant='subtle'
            flexShrink={0}
            className='tag-hover'
            key={genre.title}
            fontWeight={ genre.id === selectedGenreId 
              ? 'bold' : 'normal'
            }
            onClick={() => setSelectedGenreId(genre.id)}
          >
            <TagLabel>{genre.title}</TagLabel>
          </Tag>
        ))}
      </HScrollContainer>
    </Box>
  )
}

export default GenreTags