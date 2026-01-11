import { useAuth } from '@/AuthContext'
import useChatSessionPostNull from '@/hooks/interact/useChatSessionPostNull'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  onItemClick?: () => void
}
const NavChatButton = ({ onItemClick }: Props) => {
  const { user }= useAuth()
  const { mutate: createChat } = useChatSessionPostNull()
  const navigate = useNavigate()

  const handleCreate = () => {
    if (!user) navigate('/user/signin')
    createChat(undefined, {
      onSuccess: (newSession) => {
        if (!newSession?.id) return
        navigate(`/profile/chat/${newSession.id}`)
      }
    })
  }

  return (
    <Button
      size='md'
      px='75px' py='27px' my={4}
      bg='gray.100'
      borderRadius='full'
      _hover={{ bg: 'gray.200'}}
      onClick={() => {
        onItemClick?.()
        handleCreate()
      }}
      >
      <Text fontWeight='bold' color='gray.800' fontSize='lg'>
        Let's Chat
      </Text>
    </Button>
  )
}

export default NavChatButton