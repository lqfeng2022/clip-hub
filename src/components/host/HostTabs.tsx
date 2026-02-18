import useProductFilterStore, { HostTab } from '@/stores/productFilterStore'
import { Center, HStack, Text } from '@chakra-ui/react'

const tabs: HostTab[] = ['All', 'Clips', 'Words', 'Videos', 'Playlists', 'Courses']

const HostTabs = () => {
  const current = useProductFilterStore(s => s.hostTab)
  const setTab = useProductFilterStore(s => s.setHostTab)

  return (
    <HStack pl={3}>
      {tabs.map(t => (
        <Center
          key={t}
          height='55px' 
          px={3}
          cursor='pointer'
          onClick={() => setTab(t)}
        >
          <Text
            fontWeight='semibold'
            fontSize='sm'
            lineHeight={2}
            color={current === t ? 'gray.100' : 'gray.500'}
            borderBottom={current === t ? '1px solid' : 'none'}
            borderColor='yellow.400'
          >
            {t}
          </Text>
        </Center>
      ))}
    </HStack>
  )
}

export default HostTabs