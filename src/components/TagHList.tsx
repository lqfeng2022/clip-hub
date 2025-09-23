import useLanguageStore from '@/languageStore'
import { HStack, Tag } from '@chakra-ui/react'

interface TagHListProps<T> {
  items?: T[],
  color: string,
}
const TagHList = <T extends { id: number, title: string, title_ch?: string }>(
  { items, color }: TagHListProps<T>) => {
  const lang = useLanguageStore(s => s.language)

  return (
    <HStack py={3} wrap='wrap' spacing={3}>
      {items?.map((item) => (
        <Tag key={item.id} colorScheme={color}>
          {lang === 'ch' && item.title_ch ? item.title_ch : item.title}
        </Tag>
      ))}
    </HStack>
  )
}

export default TagHList
