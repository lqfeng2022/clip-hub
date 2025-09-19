import { Box, Circle, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Show, useDisclosure } from '@chakra-ui/react'
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
          size={10}
          _hover={{ bg: 'gray.500' }}
          onClick={() => onOpen()}
        >
          <Icon as={BsSearch} boxSize={5}/>
        </Circle>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
          />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Search what you like..</ModalHeader>
            <ModalBody>
              <SearchInput onClose={onClose}/>
              <Box h='100vw'/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>
    </>
  )
}

export default SearchInputDrawer