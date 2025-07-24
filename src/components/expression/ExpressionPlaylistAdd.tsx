import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string) => void
}
const ExpressionPlaylistAdd = ({ isOpen, onClose, onCreate }: Props) => {
  const [title, setTitle] = useState('')
  const handleCreate = () => {
    onCreate(title), setTitle(''), onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              placeholder='Enter playlist name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size='sm'
            colorScheme='green'
            onClick={handleCreate}
            isDisabled={!title.trim()}
          >
            Create
          </Button>
          <Button variant='ghost' size='sm' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ExpressionPlaylistAdd