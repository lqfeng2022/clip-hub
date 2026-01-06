import useProductFilterStore, { SearchTab } from '@/stores/productFilterStore'
import { Center, SimpleGrid, Text } from '@chakra-ui/react'

const tabs: SearchTab[] = ['Latest', 'Subtitle', 'Expression', 'Clip']

const SearchTabs = () => {
  const current = useProductFilterStore(s => s.searchTab)
  const setTab = useProductFilterStore(s => s.setSearchTab)

  return (
    <SimpleGrid columns={4} height='55px'>
      {tabs.map(t => (
        <Center
          key={t}
          cursor='pointer'
          onClick={() => setTab(t)}
          _hover={{ background: 'gray.700' }}
        >
          <Text
            fontWeight='semibold'
            color={current === t ? 'gray.100' : 'gray.500'}
            borderBottom={current === t ? '2px solid' : 'none'}
            borderColor='yellow.400'
            lineHeight={2}
          >
            {t}
          </Text>
        </Center>
      ))}
    </SimpleGrid>
  )
}

export default SearchTabs