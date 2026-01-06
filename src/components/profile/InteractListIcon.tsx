import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5'
import useListsManager from '@/hooks/useListsManager'
import CollectionAddModal from '../collection/CollectionAddModal'
import CollectionItemAdd from '../collection/CollectionItemAdd'
import { Product } from '@/entities/Product'
import useBookmarkManager from '@/hooks/useBookmarkManager'

const InteractListIcon = ({ product }: { product: Product }) => {  
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  
  const { bookmarked, setBookmarked } = useBookmarkManager(product.bookmark_state)
  const {
    lists,
    selectedListIds,
    setSelectedListIds,
    handleListAdd,
    handleListItemUpdate,
  } = useListsManager(product, onMainClose, setBookmarked)
  
  return (
    <>
      {/* Click to open the Modal A */}
      <Icon
        as={bookmarked ? IoBookmark : IoBookmarkOutline}
        boxSize='20px'
        color={bookmarked ? 'yellow.200' : ''}
        onClick={onMainOpen}
        _hover={{ 
          cursor: 'pointer', 
          color: 'yellow.200', 
          transform: 'scale(1.3)' 
        }}
        transition='transform .25s ease, color .25s ease'
      />
      {/* Model A */}
      <Modal size='xs' isOpen={isMainOpen} onClose={onMainClose}>
        <ModalOverlay />
        <ModalContent>
          {/* Header: title + close button */}
          <ModalHeader fontSize='lg'>
            Save video to...
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* A list of expression lists or a 'add expression list' message */}
            <CollectionItemAdd
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
              variant='outline'
              mr={3}
              onClick={() => handleListItemUpdate()}
            >
              Save
            </Button>
            {/* Click to open the Model B */}
            <Button variant='outline' size='sm' onClick={onAddOpen}>
              Add new list
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Model B */}
      <CollectionAddModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onCreate={handleListAdd}
      />
    </>
  )
}

export default InteractListIcon