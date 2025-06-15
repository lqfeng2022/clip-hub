import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Clip from '@/entities/Clip'
import ClipAttrDefinition from './ClipAttrDefinition'
import TagHList from '../TagHList'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  return (
    <>
      <SimpleGrid columns={2}>
        <ClipAttrDefinition term='Original'>
          {clip.original}
        </ClipAttrDefinition>
        <ClipAttrDefinition term='Released year'>
          {clip.release_year}
        </ClipAttrDefinition>
        <ClipAttrDefinition term='Platform'>
          {clip.platform.title}
        </ClipAttrDefinition>
        <ClipAttrDefinition term='Creator'>
          {clip.creator.name}
        </ClipAttrDefinition>
        <ClipAttrDefinition term='Language'>
          {clip.language.title}
        </ClipAttrDefinition>
        <ClipAttrDefinition term='Genre'>
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