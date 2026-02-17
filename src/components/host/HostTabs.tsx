import useProductFilterStore, { HostTab } from '@/stores/productFilterStore'
import { Center, SimpleGrid, Text } from '@chakra-ui/react'

const tabs: HostTab[] = ['All', 'Clips', 'Words', 'Videos', 'Playlists']

const HostTabs = () => {
  const current = useProductFilterStore(s => s.hostTab)
  const setTab = useProductFilterStore(s => s.setHostTab)

  return (
    <SimpleGrid columns={5} height='55px'>
      {tabs.map(t => (
        <Center
          key={t}
          cursor='pointer'
          onClick={() => setTab(t)}
          _hover={{ background: 'gray.700' }}
        >
          <Text
            fontWeight='bold' 
            lineHeight={2}
            borderColor='yellow.400'
            color={current === t ? 'gray.100' : 'gray.500'}
            borderBottom={current === t ? '2px solid' : 'none'}
          >
            {t}
          </Text>
        </Center>
      ))}
    </SimpleGrid>
  )
}

export default HostTabs