import Clip from '@/entities/Clip'
import useLanguageStore from '@/languageStore'
import { SimpleGrid } from '@chakra-ui/react'
import ClipAttrDefinition from './ClipAttrDefinition'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  const lang = useLanguageStore(s => s.language)

  const original = lang === 'en' ? 'Original' : '视频来源'
  const release_year = lang === 'en' ? 'Released year' : '发布日期'
  const creator = lang === 'en' ? 'Creator' : '视频作者'
  const genre = lang === 'en' ? 'Genre' : '视频类别'

  return (
    <SimpleGrid columns={2}>
      <ClipAttrDefinition term={original}>
        {lang === 'ch' && clip.original_ch ? clip.original_ch : clip.original}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={release_year}>
        {clip.release_year}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={creator}>
        {clip.creator.name}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={genre}>
        {clip.genre.title}
      </ClipAttrDefinition>
    </SimpleGrid>
  )
}

export default ClipAttributes