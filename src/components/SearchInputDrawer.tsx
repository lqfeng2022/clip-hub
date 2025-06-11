import { Circle, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Show, useDisclosure } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import SearchInput from './SearchInput'

const SearchInputDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Show above='sm'>
        <SearchInput />
      </Show>
      <Show below='sm'>
        <Circle 
          size={10}
          _hover={{ bg: 'gray.500' }}
          onClick={() => onOpen()}
        >
          <Icon as={BsSearch} boxSize={5}/>
        </Circle>
        <Drawer onClose={onClose} isOpen={isOpen} size='xs'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search what you like..</DrawerHeader>
            <DrawerBody>
              <SearchInput onClose={onClose}/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  )
}

export default SearchInputDrawer