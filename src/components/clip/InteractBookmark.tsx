import {
  Button,Icon, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoBookmarkOutline } from 'react-icons/io5'
import Clip from '../../entities/Clip'
import useLists from '../../hooks/useLists'
import ClipCreateList from './ClipCreateList'
import ClipSaveList from './ClipSaveList'
import useListItemPost from '../../hooks/useListItemPost'
import useListPost from '../../hooks/useListPost'

interface Props {
  clip: Clip
}
const InteractBookmark = ({ clip }: Props) => {
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  
  const { data, refetch } = useLists() // get playlists

  const { mutate: addList } = useListPost()
  const handleCreateList = (title: string) => {
    // console.log('Create new playlist:', title)
    // send to backend
    addList({ title }, { onSuccess: () => refetch() })
  }
  
  const [selectedListIds, setSelectedListIds] = useState<number[]>([])
  const { mutate: addListItem } = useListItemPost()
  const handleCreateListItem = (video_id: number, selectedListIds: number[]) => {
    // send to backend
    addListItem({ video_id, listIds: selectedListIds })
    onMainClose()
  }

  return (
    <>
      {/* Click to open the Modal A */}
      <Icon
        as={IoBookmarkOutline}
        boxSize={6}
        onClick={onMainOpen}
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
            <ClipSaveList 
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
                handleCreateListItem(clip.id, selectedListIds)
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
      <ClipCreateList 
        isOpen={isAddOpen} 
        onClose={onAddClose} 
        onCreate={handleCreateList}
      />
    </>
  )
}

export default InteractBookmark