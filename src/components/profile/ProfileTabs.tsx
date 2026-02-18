import { Center, HStack, Text } from '@chakra-ui/react'
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
    <HStack pl='3px'>
      {tabs.map(tab => (
        <Center
          key={tab}
          height='55px'
          px={3}
          cursor='pointer'
          onClick={() => handleSelect(tab)}
        >
          <Text
            fontWeight='semibold'
            fontSize='sm'
            color={selected === tab ? 'gray.100' : 'gray.500'}
            borderBottom={selected === tab ? '1px solid' : 'none'}
            borderColor='yellow.400'
            lineHeight={2}
          >
            {tab}
          </Text>
        </Center>
      ))}
    </HStack>
  )
}

export default ProfileTabs