import { useAuth } from '@/AuthContext'
import useChatSessionPostNull from '@/hooks/interact-chat/useChatSessionPostNull'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  hostId?: string | null
  onItemClick?: () => void
}
const HostChatButton = ({ hostId, onItemClick }: Props) => {
  const { user }= useAuth()
  const { mutate: createChat } = useChatSessionPostNull()
  const navigate = useNavigate()

  const handleCreate = () => {
    if (!user) {
      navigate('/user/signin')
      return
    } 
    
    createChat(hostId ?? undefined, {
      onSuccess: (newSession) => {
        if (!newSession?.id) return
        navigate(`/chat/${newSession.id}`)
      }
    })
  }

  return (
    <Button
      mr={4}
      borderRadius='full'
      size='sm'
      fontWeight='bold'
      bg='yellow.700'
      _hover={{bg: 'green.200', color: 'gray.700'}}
      onClick={() => {
        onItemClick?.()
        handleCreate()
      }}
      >
        Chat
    </Button>
  )
}

export default HostChatButton