import { useAuth } from '@/AuthContext'
import { Button } from '@chakra-ui/react'

interface Props {
  followed: boolean
  onToggle: () => void
}
const SubscribeButton = ({ followed, onToggle }: Props) => {
  const { isAuthenticated } = useAuth()

  return (
    <Button
      // colorScheme={followed ? 'gray' : 'cyan'}
      borderRadius='full'
      size='xs'
      fontWeight='bold'
      onClick={onToggle}
      bg={followed ? 'gray.100' : 'gray.700'}
      color={followed ? 'gray.700' : 'gray.100'}
      _hover={{bg: 'yellow.200', color: 'gray.700'}}
      disabled={!isAuthenticated}
    >
      {followed ? 'Following' : 'Subscribe'}
    </Button>
  )
}

export default SubscribeButton