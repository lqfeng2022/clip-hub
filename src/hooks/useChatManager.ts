import { useAuth } from '@/AuthContext'
import useChatSessionPost from './store/useChatSessionPost'
import useChatSessions from './interact-chat/useChatSessions'
import { useLocation, useNavigate } from 'react-router-dom'

const useChatManager = (productId: number) => {
  const { user } = useAuth()
  const { refetch } = useChatSessions()
  const { mutate: postChat } = useChatSessionPost(productId, 'chatsession')

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isChatPage = pathname === '/chat'

  const deleteChat = () => {
    if (!user) return
    postChat({ visible: false }, {
      onSuccess: () => refetch()
    })
  }

  const startChat = () => {
    if (!user) return
    postChat({ visible: true }, {
      onSuccess: (session) => {
        refetch()
          if (!isChatPage) 
            navigate(`/chat/${session.id}`)
      }
    })
  }

  return { deleteChat, startChat }
}

export default useChatManager