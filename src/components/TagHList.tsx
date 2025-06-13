import { HStack, Tag } from '@chakra-ui/react'

interface TagHListProps<T> {
  items?: T[],
  color: string,
}

const TagHList = <T extends { id: number; title: string }>(
  { items, color }: TagHListProps<T>) => {
  return (
    <HStack py={3} spacing={3}>
      {items?.map((item) => (
        <Tag key={item.id} colorScheme={color}>
          {item.title}
        </Tag>
      ))}
    </HStack>
  )
}

export default TagHList
