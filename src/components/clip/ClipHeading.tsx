import { Heading } from '@chakra-ui/react'
import useGenre from '@/hooks/store/useGenre'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'

const ClipHeading = () => {
  const genreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const genre = useGenre(genreId)
  
  // Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const lang = useLanguageStore(s => s.language)
  const heading = `${genre?.title || ''} Clips `
  const heading_ch = `${genre?.title_ch || ''} 视频 `

  return (
    <Heading my={4} fontSize='3xl'>
      {lang === 'en' ? heading: heading_ch}
    </Heading>
  )
}

export default ClipHeading