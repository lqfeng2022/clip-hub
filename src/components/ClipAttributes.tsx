import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Clip from '../entities/Clip'
import DefinitionItem from './DefinitionItem'
import TagList from './TagList'

interface Props {
  clip: Clip
}
const ClipAttributes = ({ clip }: Props) => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <DefinitionItem term='Original'>
          {clip.original}
        </DefinitionItem>
        <DefinitionItem term='Released year'>
          {clip.release_year}
        </DefinitionItem>
        <DefinitionItem term='Platform'>
          {clip.platform.title}
        </DefinitionItem>
        <DefinitionItem term='Creator'>
          {clip.creator.name}
        </DefinitionItem>
        <DefinitionItem term='Language'>
          {clip.language.title}
        </DefinitionItem>
        <DefinitionItem term='Genre'>
          {clip.genre.title}
        </DefinitionItem>
      </SimpleGrid>
      <Box my={2}>
        <Heading fontSize='md' color='gray.500'>
          Tags
        </Heading>
        <TagList tags={clip.tags}/>
      </Box>
    </div>
  )
}

export default ClipAttributes