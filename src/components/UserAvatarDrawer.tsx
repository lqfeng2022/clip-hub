import { useAuth } from '@/AuthContext'
import { Avatar, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Icon, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCircleUser } from 'react-icons/fa6'
import NavListDrawer from './NavListDrawer'

const UserAvatarDrawer = () => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portrait = `https://clipwords.me/${user?.portrait}`
    
  return (
    <>
      {user ? <Avatar
        size='md'
        fontWeight='semibold'
        name={fullName}
        src={user?.portrait ? portrait : ''}
        onClick={() => onOpen()}
        cursor='pointer'
        opacity={0.9}
        _hover={{ bg: 'gray.200' }}
        transition='.25s'
      /> : <Link to='/user/signin'>
        <Icon 
          as={FaCircleUser} 
          boxSize='32px' 
          display='block' 
          color='gray.100'
          cursor='pointer'
          _hover={{ color: 'yellow.200' }}
        />
      </Link>}
      <Drawer 
        size='xs' 
        placement='left'
        onClose={onClose} 
        isOpen={isOpen} 
        autoFocus={false} 
      >
        <DrawerOverlay/>
        <DrawerContent background='gray.800'>
          <DrawerBody>
            <NavListDrawer onItemClick={onClose}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UserAvatarDrawer