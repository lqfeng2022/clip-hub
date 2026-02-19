import useProductFilterStore, { SearchTab } from '@/stores/productFilterStore'
import { Center, HStack, Text } from '@chakra-ui/react'

const tabs: SearchTab[] = ['Latest', 'Clips', 'Words', 'Videos']

const SearchTabs = () => {
  const current = useProductFilterStore(s => s.searchTab)
  const setTab = useProductFilterStore(s => s.setSearchTab)

  return (
    <HStack pl={3} >
      {tabs.map(t => (
        <Center
          key={t}
          height='55px'
          px={3}
          cursor='pointer'
          onClick={() => setTab(t)}
        >
          <Text
            lineHeight={2}
            fontWeight='semibold'
            borderBottom={current === t ? '1px solid' : 'none'}
            color={current === t ? 'gray.100' : 'gray.500'}
            borderColor='yellow.400'
          >
            {t}
          </Text>
        </Center>
      ))}
    </HStack>
  )
}

export default SearchTabs