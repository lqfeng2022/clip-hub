import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { IoBookmarkOutline } from 'react-icons/io5'
import { useAuth } from '@/AuthContext'
import Clip from '@/entities/Clip'
import useClipPlaylistManager from '@/hooks/interact/useClipPlaylistManager'
import ClipPlaylistAdd from './ClipPlaylistAdd'
import ClipPlaylistItemAdd from './ClipPlaylistItemAdd'

const ClipInteractIconSave = ({ clip }: { clip: Clip }) => {
  const { user } = useAuth()
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  
  const {
    lists,
    selectedListIds,
    setSelectedListIds,
    handleListAdd,
    handleListItemUpdate,
  } = useClipPlaylistManager(clip, onMainClose)
  
  if (!user) return <Icon as={IoBookmarkOutline} boxSize={6} opacity={0.5}/>
  return (
    <>
      {/* Click to open the Modal A */}
      <Icon
        as={IoBookmarkOutline}
        boxSize={6}
        onClick={onMainOpen}
        _hover={{ cursor: 'pointer' }}
      />
      {/* Model A */}
      <Modal isOpen={isMainOpen} onClose={onMainClose}>
        <ModalOverlay />
        <ModalContent>
          {/* Header: title + close button */}
          <ModalHeader>Save video to...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* A list of playlists or a 'add playlist' message */}
            <ClipPlaylistItemAdd 
              lists={lists} 
              selectedListIds={selectedListIds}
              onChange={setSelectedListIds}
            />
          </ModalBody>
          {/* Footer buttons: save + add */}
          <ModalFooter gap={3}>
            <Button 
              size='sm' 
              colorScheme='gray' 
              mr={3} 
              onClick={() => {
                handleListItemUpdate()
              }}
            >
              Save
            </Button>
            {/* Click to open the Model B */}
            <Button variant='outline' size='sm' onClick={onAddOpen}>
              Add new playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Model B */}
      <ClipPlaylistAdd 
        isOpen={isAddOpen} 
        onClose={onAddClose} 
        onCreate={handleListAdd}
      />
    </>
  )
}

export default ClipInteractIconSave