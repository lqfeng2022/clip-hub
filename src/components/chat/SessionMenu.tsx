import useChatManager from '@/hooks/useChatManager'
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { TfiMoreAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import { PiSignpostFill } from 'react-icons/pi'
import { FaUser } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import ChatSession from '@/entities/ChatSession'

interface Props {
  chat: ChatSession,
  onUnmark?: () => void,
}
const SessionMenu = ({ chat }: Props) => {
  const product = chat.product
  const host = chat.host

  const navigate = useNavigate()
  const { deleteChat  } = useChatManager(product.id)

  const hostPageUrl = `/host/${host.slug}`
  const postPageUrl = `/products/${product.id}`

  return (
    <Menu>
      <MenuButton  
        as={IconButton}
        aria-label='Options'
        icon={<TfiMoreAlt />}
        variant='ghost'
        boxSize={10}
        color='gray.300'
        borderRadius='full'
      />
      <MenuList 
        bg='gray.700' 
        py={0}
        borderRadius='lg'
        overflow='hidden'
      >
        <MenuItem 
          fontSize='lg' 
          py={2}
          onClick={() => navigate(hostPageUrl)}
        >
          <Icon as={FaUser} mr={3}/>
          <Text fontWeight='semibold' fontSize='sm'>
            View more @{host.slug}
          </Text>
        </MenuItem>
        <MenuItem 
          fontSize='lg'
          py={2}
          onClick={() => navigate(postPageUrl)}
        >
          <Icon as={PiSignpostFill} mr={3}/>
          <Text fontWeight='semibold' fontSize='sm'>
            View this Post
          </Text>
        </MenuItem>
        <MenuItem 
          fontSize='lg' 
          py={2}
          onClick={deleteChat}
        >
          <Icon as={AiFillDelete} mr={3}/>
          <Text fontWeight='semibold' fontSize='sm'>
            Delete this chat
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default SessionMenu