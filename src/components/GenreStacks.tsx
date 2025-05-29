import {
  Box,
  Spinner,
  Tag,
  TagLabel
} from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'
import useClipQueryStore from '../clipStore'

const GenreStacks = () => {
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
        scrollBehavior='smooth' // Enables smooth scroll interactions
        sx={{ '&::-webkit-scrollbar': {
            display: 'none' // Optional: hide scrollbar
          }
        }}
      >
      {data?.results.map((genre) => (
        <Tag
          size='lg'
          variant='subtle'
          key={genre.title}
          flexShrink={0}
          cursor='pointer'
          className='tag-hover'
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

export default GenreStacks