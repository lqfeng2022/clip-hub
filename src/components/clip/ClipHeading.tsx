import { Heading } from '@chakra-ui/react'
import useGenre from '@/hooks/store/useGenre'
import useClipQueryStore from '@/clipStore'

const ClipHeading = () => {
  const genreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const genre = useGenre(genreId)

  // Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const heading = `${genre?.title || ''} Clips `

  return (
    <Heading my={4} fontSize='3xl'>
      {heading}
    </Heading>
  )
}

export default ClipHeading