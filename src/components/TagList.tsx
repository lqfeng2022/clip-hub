import { Badge, HStack } from '@chakra-ui/react';
import Tags from '../entities/Tag';

interface Props {
  tags: Tags[];
}

const TagList = ({ tags }: Props) => {
  return (
    <HStack>
      {tags.map((tag) => (
        <Badge
          fontSize='2xs'
          color='yellow.100'
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
