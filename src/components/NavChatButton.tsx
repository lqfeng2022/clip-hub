import { useAuth } from '@/AuthContext'
import useChatSessionPostNull from '@/hooks/interact-chat/useChatSessionPostNull'
import useLanguageStore from '@/stores/languageStore'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  hostId?: string | null
  onItemClick?: () => void
}
const NavChatButton = ({ hostId, onItemClick }: Props) => {
  const lang = useLanguageStore(s => s.language)
  
  const { user }= useAuth()
  const { mutate: createChat } = useChatSessionPostNull()
  
  const navigate = useNavigate()

  const handleCreate = () => {
    if (!user) {
      navigate('/user/signin')
      return
    }
    // Only pass hostId if it's truthy
    createChat(hostId ?? undefined, {
      onSuccess: (newSession) => {
        if (!newSession?.id) return
        navigate(`/profile/chat/${newSession.id}`)
      }
    })
  }

  return (
    <Button
      size='md'
      px='40px' py='27px' my={4}
      bg='gray.100'
      borderRadius='full'
      _hover={{ bg: 'gray.200'}}
      onClick={() => {
        onItemClick?.()
        handleCreate()
      }}
      >
      <Text fontWeight='bold' color='gray.800' fontSize='lg'>
        {lang === 'en' ? "Let's Chat" : "我们聊聊"}
      </Text>
    </Button>
  )
}

export default NavChatButton