import { 
  Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import List from '../../entities/List'

interface Props {
  list: List
  isOpen: boolean
  onClose: () => void
  onUpdate: (title: string) => void
}
const PlaylistCardModal = ({ list, isOpen, onClose, onUpdate }: Props) => {
  const [title, setTitle] = useState('')

  // Set the title when modal opens
  useEffect(() => { 
    if (isOpen) setTitle(list.title) 
    }, [isOpen, list.title]
  )

  const handleUpdate = () => {
    // ignoring the unchaned title sending..
    const trimmed = title.trim()
    if (trimmed && trimmed !== list.title) {
      onUpdate(trimmed)
    }
    onClose()
    setTitle('')
  }

  // disable the space title and unchanged title
  const badValue = !title.trim() || title.trim() === list.title
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update your playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              placeholder='Edit playlist name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size='sm'
            colorScheme='green'
            onClick={handleUpdate}
            isDisabled={badValue}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PlaylistCardModal