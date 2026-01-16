import { Center, SimpleGrid, Text } from '@chakra-ui/react'
import { useState } from 'react'

type SearchTag = 'Likes' | 'Histories' | 'Subscribes'

interface Props {
  value?: SearchTag,
  onChange?: (tab: SearchTag) => void
}
const ProfileTabs = ({ value, onChange }: Props) => {
  const [internal, setInternal] = useState<SearchTag>('Likes')
  const selected = value ?? internal

  const tabs: SearchTag[] = ['Likes', 'Subscribes', 'Histories']

  const handleSelect = (tab: SearchTag) => {
    setInternal(tab)
    onChange?.(tab)
  }

  return (
    <SimpleGrid columns={3} height='55px'>
      {tabs.map(tab => (
        <Center
          key={tab}
          cursor='pointer'
          onClick={() => handleSelect(tab)}
        >
          <Text
            fontWeight='semibold'
            color={selected === tab ? 'gray.100' : 'gray.500'}
            borderBottom={selected === tab ? '2px solid' : 'none'}
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

export default ProfileTabs