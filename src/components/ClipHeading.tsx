import { Heading } from '@chakra-ui/react'
import useGenre from '../hooks/useGenre'
import useLanguage from '../hooks/useLanguage'
import useClipQueryStore from '../clipStore'

const ClipHeading = () => {
  const genreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const genre = useGenre(genreId)

  const languageId = useClipQueryStore((s) => s.clipQuery.languageId)
  const language = useLanguage(languageId)

  // Clips
  // Japanese Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const heading = `${language?.title || ''} ${genre?.title || ''} Clips `

  return (
    <Heading my={4} fontSize='4xl'>
      {heading}
    </Heading>
  )
}

export default ClipHeading