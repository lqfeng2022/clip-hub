import { HStack, Tag } from '@chakra-ui/react'
import Tags from '@/entities/Tag'

interface Props {
  tags: Tags[],
  color: string,
}
const ClipTags = ({ tags, color }: Props) => {
  return (
    <HStack py={3} spacing={3}>
      {tags.map((tag) => (
        <Tag colorScheme={color} key={tag.id}>
          {tag.title}
        </Tag>
      ))}
    </HStack>
  )
}

export default ClipTags
