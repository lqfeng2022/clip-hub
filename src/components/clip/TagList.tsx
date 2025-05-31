import { HStack, Tag } from '@chakra-ui/react'
import Tags from '../../entities/Tag'

interface Props {
  tags: Tags[],
  color: string,
}
const TagList = ({ tags, color }: Props) => {
  return (
    <HStack pt={2} spacing={2}>
      {tags.map((tag) => (
        <Tag colorScheme={color} key={tag.id} size='sm'>
          {tag.title}
        </Tag>
      ))}
    </HStack>
  )
}

export default TagList
