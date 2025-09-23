import Clip from '@/entities/Clip'
import useLanguageStore from '@/languageStore'
import { Box, Link } from '@chakra-ui/react'
import ClipAttrDefinition from './ClipAttrDefinition'
import { clipPage } from '@/data/clipPage'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  const lang = useLanguageStore(s => s.language)
  const attributes = lang === 'en' ? clipPage.en : clipPage.zh
  const original = lang === 'ch' && clip.original_ch ? clip.original_ch : clip.original

  return (
    <Box pt={2}>
      <ClipAttrDefinition term={attributes.creator}>
        {clip.creator.name}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={attributes.release_year}>
        {clip.release_year}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={attributes.genre}>
        {clip.genre.title}
      </ClipAttrDefinition>
      <ClipAttrDefinition term={attributes.original}>
        <Link
          href={clip.website}
          isExternal
          fontStyle='italic'
          _hover={{color: 'yellow.200'}}
        >
          {original}
        </Link>
      </ClipAttrDefinition>
    </Box>
  )
}

export default ClipAttributes