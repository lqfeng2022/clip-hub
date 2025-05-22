import { SimpleGrid, Text } from '@chakra-ui/react';
import Clip from '../entities/Clip';
import DefinitionItem from './DefinitionItem';

interface Props {
  clip: Clip;
}

const ClipAttributes = ({ clip }: Props) => {
  return (
    //'dl': description list
    <SimpleGrid columns={2} as='dl'>
      <DefinitionItem term='Original'>
        <Text>{clip.original}</Text>
      </DefinitionItem>
      <DefinitionItem term='Release_year'>
        <Text>{clip.release_year}</Text>
      </DefinitionItem>
      <DefinitionItem term='Platform'>
        <Text>{clip.platform.title}</Text>
      </DefinitionItem>
      <DefinitionItem term='Creator'>
        <Text>{clip.creator.name}</Text>
      </DefinitionItem>
      <DefinitionItem term='Language'>
        <Text>{clip.language.title}</Text>
      </DefinitionItem>
      <DefinitionItem term='Genre'>
        <Text>{clip.genre.title}</Text>
      </DefinitionItem>
      <DefinitionItem term='Tags'>
        {clip.tags.map((tag) => (
          <Text key={tag.id}>{tag.title}</Text>
        ))}
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default ClipAttributes;