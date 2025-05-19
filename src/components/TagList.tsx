import { Badge, HStack } from '@chakra-ui/react';
import {Tags} from '../hooks/useClips'

interface Props {
  tags: Tags[];
}

const TagList = ({ tags }: Props) => {
  return (
    <HStack>
      {tags.map((tag) => (
        <Badge
          colorScheme='yellow'
          fontSize='12px'
          p='3px 5px'
          borderRadius='4px'
          key={tag.id}
        >
          {tag.title}
        </Badge>
      ))}
    </HStack>
  );
};

export default TagList;
