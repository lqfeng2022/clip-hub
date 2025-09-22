import { Circle, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Show, useDisclosure } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import SearchInput from './SearchInput'

const SearchInputDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Show above='md'>
        <SearchInput />
      </Show>
      <Show below='md'>
        <Circle
          size={8}
          _hover={{ bg: 'gray.700' }}
          onClick={() => onOpen()}
        >
          <Icon as={BsSearch} boxSize={5}/>
        </Circle>
      </Show>
      <Drawer onClose={onClose} isOpen={isOpen} size='sm'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Search what you like.`}</DrawerHeader>
          <DrawerBody>
            <SearchInput onClose={onClose}/>
            {/* <Box h='100vw'/> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SearchInputDrawer