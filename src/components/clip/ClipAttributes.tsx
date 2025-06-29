import Clip from '@/entities/Clip'
import { SimpleGrid } from '@chakra-ui/react'
import ClipAttrDefinition from './ClipAttrDefinition'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  return (
    <SimpleGrid columns={2}>
      <ClipAttrDefinition term='Original'>
        {clip.original}
      </ClipAttrDefinition>
      <ClipAttrDefinition term='Released year'>
        {clip.release_year}
      </ClipAttrDefinition>
      <ClipAttrDefinition term='Platform / Publisher'>
        {clip.platform.title}
      </ClipAttrDefinition>
      <ClipAttrDefinition term='Creator'>
        {clip.creator.name}
      </ClipAttrDefinition>
      <ClipAttrDefinition term='Genre'>
        {clip.genre.title}
      </ClipAttrDefinition>
    </SimpleGrid>
  )
}

export default ClipAttributes