import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Clip from '@/entities/Clip'
import ClipAttrDefinition from './ClipAttrDefinition'
import TagHList from '../TagHList'
import useLanguageStore from '@/languageStore'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  const lang = useLanguageStore(s => s.language)

  const original = lang === 'en' ? 'Original' : '视频来源'
  const release_year = lang === 'en' ? 'Released year' : '发布日期'
  const publisher = lang === 'en' ? 'Platform / Publisher' : '视频出处'
  const creator = lang === 'en' ? 'Creator' : '视频作者'
  const genre = lang === 'en' ? 'Genre' : '视频类别'

  return (
    <>
      <SimpleGrid columns={2}>
        <ClipAttrDefinition term={original}>
          {lang === 'ch' && clip.original_ch ? clip.original_ch : clip.original}
        </ClipAttrDefinition>
        <ClipAttrDefinition term={release_year}>
          {clip.release_year}
        </ClipAttrDefinition>
        <ClipAttrDefinition term={publisher}>
          {clip.platform.title}
        </ClipAttrDefinition>
        <ClipAttrDefinition term={creator}>
          {clip.creator.name}
        </ClipAttrDefinition>
        <ClipAttrDefinition term={genre}>
          {clip.genre.title}
        </ClipAttrDefinition>
      </SimpleGrid>
      <Box my={2}>
        <Heading fontSize='md' color='gray.500'>
          Tags
        </Heading>
        <TagHList items={clip.tags} color={'cyan'}/>
      </Box>
    </>
  )
}

export default ClipAttributes