import { Heading } from '@chakra-ui/react'
import useGenre from '@/hooks/store/useGenre'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'
import { clipPage } from '@/data/clipPage'

const ClipHeading = () => {
  const genreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const genre = useGenre(genreId)
  
  // Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? `${genre?.title || ''} ${clipPage.en.clip}` 
    : `${genre?.title_ch || ''} ${clipPage.zh.clip}`

  return (
    <Heading my={4} fontSize='3xl'>
      {header}
    </Heading>
  )
}

export default ClipHeading