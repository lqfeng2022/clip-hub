import { Box, Spinner, Tag, TagLabel } from '@chakra-ui/react'
import useGenres from '../../hooks/useGenres'
import useClipQueryStore from '../../clipStore'

const GenreTags = () => {
  const {data, error, isLoading} = useGenres()
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box py={2}>
      <Box 
        gap={5}
        py={2}
        display='flex' // Horizontal layout
        width='90vw' // '100vw' will right offset, -> '90vw'
        overflowX='auto' // Enables scrolling when content overflows
        whiteSpace='nowrap' // Prevents tag wrapping
      >
        {data?.results.map((genre) => (
          <Tag
            size='lg'
            variant='subtle'
            flexShrink={0}
            className='tag-hover'
            key={genre.title}
            fontWeight={
              genre.id === selectedGenreId ? 'bold' : 'normal'
            }
            onClick={() => setSelectedGenreId(genre.id)}
          >
            <TagLabel>{genre.title}</TagLabel>
          </Tag>
        ))}
      </Box>
    </Box>
  )
}

export default GenreTags