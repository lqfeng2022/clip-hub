import { Icon } from '@chakra-ui/react'
import { FaFolder } from 'react-icons/fa'

const CollectionCardIcon = () => {
  return (
    <Icon
      as={FaFolder}
      boxSize={12}
      color='yellow.200'
      position='absolute'
      top={2}
      right={2}
      p={1.5}
      bg='rgba(0,0,0,0.4)'
      borderRadius='lg'
    />
  )
}

export default CollectionCardIcon