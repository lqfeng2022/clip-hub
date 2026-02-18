import { Center, SimpleGrid, Text } from '@chakra-ui/react'
import { useState } from 'react'

type CollectionTag = 'Collections' | 'Playlists' | 'Courses'

interface Props {
  value?: CollectionTag
  onChange?: (tab: CollectionTag) => void
}
const CollectionTabs = ({ value, onChange }: Props) => {
  const [internal, setInternal] = useState<CollectionTag>('Collections')
  const selected = value ?? internal

  const tabs: CollectionTag[] = ['Collections', 'Playlists', 'Courses']

  const handleSelect = (tab: CollectionTag) => {
    setInternal(tab)
    onChange?.(tab)
  }

  return (
    <SimpleGrid 
      columns={3}
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
            fontWeight='semibold'
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