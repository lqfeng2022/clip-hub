import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}
const ChatBotDleteModal = ({ isOpen, onClose, onDelete } : Props) => {
  const handleDelete = () => {
    onDelete()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Chat Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Do you really want to delete this chat session?
        </ModalBody>
        <ModalFooter>
          <Button size='sm' fontSize='lg' mr={20} onClick={handleDelete}>
            Delete
          </Button>
          <Button size='sm' variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

}

export default ChatBotDleteModal