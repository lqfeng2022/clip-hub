import { Badge } from '@chakra-ui/react'

const HostBadge = () => {
  return (
    <Badge 
      mx={1} 
      fontSize='0.6em' 
      variant='solid' 
      colorScheme='green'
      fontWeight='light'
    >
      Host
    </Badge>
  )
}

export default HostBadge