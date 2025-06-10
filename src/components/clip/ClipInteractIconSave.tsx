import {
  Button,Icon, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoBookmarkOutline } from 'react-icons/io5'
import Clip from '../../entities/Clip'
import useLists from '../../hooks/interact/useLists'
import ClipPlayistAdd from './ClipPlaylistAdd'
import ClipPlaylistItemAdd from './ClipPlaylistItemAdd'
import useListItemPost from '../../hooks/interact/useListItemPost'
import useListPost from '../../hooks/interact/useListPost'
import { useAuth } from '../../AuthContext'

const ClipInteractIconSave = ({ clip }: { clip: Clip }) => {
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  
  const { user } = useAuth()
  const { data, refetch } = useLists() // get playlists
  const { mutate: addList } = useListPost()

  const handleAddList = (title: string) => {
    addList({ title }, { onSuccess: () => refetch() })
  }
  
  const [selectedListIds, setSelectedListIds] = useState<number[]>([])
  const { mutate: addListItem } = useListItemPost()
  const handleListItemAdd = (video_id: number, selectedListIds: number[]) => {
    addListItem({ video_id, listIds: selectedListIds })
    onMainClose()
  }
  
  if (!user) return null
  return (
    <>
      {/* Click to open the Modal A */}
      <Icon
        as={IoBookmarkOutline}
        boxSize={6}
        onClick={user ? onMainOpen : undefined}
        _hover={{ cursor: 'pointer' }}
        opacity={user ? 1 : 0.5}
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
              lists={data?.pages[0]?.results ?? []} // safe fallback
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
                handleListItemAdd(clip.id, selectedListIds)
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
      <ClipPlayistAdd 
        isOpen={isAddOpen} 
        onClose={onAddClose} 
        onCreate={handleAddList}
      />
    </>
  )
}

export default ClipInteractIconSave