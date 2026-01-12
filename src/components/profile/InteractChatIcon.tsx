import { useAuth } from '@/AuthContext'
import { Product } from '@/entities/Product'
import useChatManager from '@/hooks/useChatManager'
import { Icon } from '@chakra-ui/react'
import { IoIosChatbubbles } from 'react-icons/io'

interface Props {
  product: Product,
}
const InteractChatIcon = ({ product }: Props) => {
  const { user } = useAuth()
  const { startChat } = useChatManager(product.id)

  return (
    <>
      {user && <Icon
        as={IoIosChatbubbles}
        boxSize='20px'
        color={product.chat_state ? 'green.300' : ''}
        cursor='pointer'
        _hover={{ color: 'green.300', transform: 'scale(1.3)' }}
        transition='transform .25s ease, color .25s ease'
        onClick={startChat}
      />}
      {!user && <Icon 
        as={IoIosChatbubbles} 
        color='gray.600'
        boxSize='20px' 
      />}
    </>
  )
}

export default InteractChatIcon