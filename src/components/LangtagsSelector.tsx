import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import LangtagsList from './LangtagsList'

const LangtsgsSelector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button size='sm' onClick={onOpen}>Select tags</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LangtagsList/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LangtsgsSelector