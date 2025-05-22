import { HStack, Tag } from '@chakra-ui/react';
import Tags from '../entities/Tag';

interface Props {
  tags: Tags[];
}

const TagList = ({ tags }: Props) => {
  return (
    <HStack pt={2} spacing={3}>
      {tags.map((tag) => (
        <Tag colorScheme='cyan' key={tag.id}>
          {tag.title}
        </Tag>
      ))}
    </HStack>
  );
};

export default TagList;
