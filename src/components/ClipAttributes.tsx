import { SimpleGrid, Text } from '@chakra-ui/react';
import Clip from '../entities/Clip';
import DefinitionItem from './DefinitionItem';
import TagList from './TagList';

interface Props {
  clip: Clip;
}

const ClipAttributes = ({ clip }: Props) => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <DefinitionItem term='Original'>
          <Text>{clip.original}</Text>
        </DefinitionItem>
        <DefinitionItem term='Released year'>
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
      </SimpleGrid>
      <DefinitionItem term='Tags'>
        <TagList tags={clip.tags}/>
      </DefinitionItem>
    </div>
  );
};

export default ClipAttributes;