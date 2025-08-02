import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { IoBookmarkOutline } from 'react-icons/io5'
import { useAuth } from '@/AuthContext'
import useListsManager from '@/hooks/interact/useListsManager'
import ExpressionListAdd from './ExpressionListAdd'
import ExpressionListItemAdd from './ExpressionListItemAdd'
import Expression from '@/entities/Expression'

const InteractIconSave = ({ exp }: { exp: Expression }) => {
  const { user } = useAuth()
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  
  const {
    lists,
    selectedListIds,
    setSelectedListIds,
    handleListAdd,
    handleListItemUpdate,
  } = useListsManager(exp, onMainClose)
  
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
            {/* A list of expression lists or a 'add expression list' message */}
            <ExpressionListItemAdd 
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
              Add new list
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Model B */}
      <ExpressionListAdd 
        isOpen={isAddOpen} 
        onClose={onAddClose} 
        onCreate={handleListAdd}
      />
    </>
  )
}

export default InteractIconSave