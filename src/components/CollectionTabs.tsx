import { Center, SimpleGrid, Text } from '@chakra-ui/react'
import { useState } from 'react'

type FeedTag = 'Collections' | 'Playlists'

interface Props {
  value?: FeedTag
  onChange?: (tab: FeedTag) => void
}
const CollectionTabs = ({ value, onChange }: Props) => {
  const [internal, setInternal] = useState<FeedTag>('Collections')
  const selected = value ?? internal

  const tabs: FeedTag[] = ['Collections', 'Playlists']

  const handleSelect = (tab: FeedTag) => {
    setInternal(tab)
    onChange?.(tab)
  }

  return (
    <SimpleGrid 
      columns={2}
      position='sticky'
      height='55px'
      top='0px' // height of top navbar
      zIndex={10}
      bg='#262626'
      opacity='0.95'
      justifyContent='center'
    >
      {tabs.map(tab => (
        <Center
          key={tab}
          cursor='pointer'
          onClick={() => handleSelect(tab)}
          _hover={{background: 'gray.700', opacity: '0.99'}}
        >
          <Text
            color={selected === tab ? 'gray.100' : 'gray.500'}
            borderBottom={selected === tab ? '1px solid' : 'none'}
            borderColor='yellow.400'
            lineHeight={2}
          >
            {tab}
          </Text>
        </Center>
      ))}
    </SimpleGrid>
  )
}

export default CollectionTabs