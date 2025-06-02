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
import useExpressionQueryStore from '../expressionStore'
import { useLangtag } from '../hooks/useLangtag'

const LangtsgsSelector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const selectedTagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId
  )
  const selectedLangtag = useLangtag(selectedTagId)

  return (
    <>
      <Button size='sm' onClick={onOpen}>
        Select: {selectedLangtag?.title || 'tags'}
      </Button>
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