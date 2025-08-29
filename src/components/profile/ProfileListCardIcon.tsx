import { Icon } from '@chakra-ui/react'
import { FaFolder } from 'react-icons/fa'

const ProfileListCardIcon = () => {
  return (
    <Icon
      as={FaFolder}
      boxSize={9}
      color='gray.100'
      position='absolute'
      top={1}
      left={1}
      p={1}
      bg='rgba(0,0,0,0.4)'
      borderRadius='md'
    />
  )
}

export default ProfileListCardIcon