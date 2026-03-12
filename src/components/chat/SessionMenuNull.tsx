import ChatSession from '@/entities/ChatSession'
import useChatSessionDelete from '@/hooks/interact-chat/useChatSessionDelete'
import useChatSessions from '@/hooks/interact-chat/useChatSessions'
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { AiFillDelete } from 'react-icons/ai'
import { TfiMoreAlt } from 'react-icons/tfi'

const SessionMenuNull = ({ chat }: { chat: ChatSession}) => {
  const { mutate: deleteChat  } = useChatSessionDelete()
  const { refetch } = useChatSessions()

  const handleDelteChat = (sessionId: number) => {
    deleteChat({sessionId}, { onSuccess: () => refetch() })
  }

  return (
    <Menu>
      <MenuButton  
        as={IconButton}
        aria-label='Options'
        icon={<TfiMoreAlt />}
        variant='ghost'
        size='sm'
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
          onClick={() => handleDelteChat(chat.id)}
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

export default SessionMenuNull