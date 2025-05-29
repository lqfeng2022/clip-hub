import {
  Circle, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
  DrawerHeader, DrawerOverlay, Icon, useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import SearchInput from './SearchInput'

const SearchDrawer = () => {
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = (newSize: string) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <>
      <Circle 
        size={10}
        as='button'
        _hover={{ bg: 'gray.500' }}
        onClick={() => handleClick('xs')}
      >
        <Icon as={BsSearch} boxSize={5}/>
      </Circle>
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search what you like..</DrawerHeader>
          <DrawerBody>
            <SearchInput />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SearchDrawer