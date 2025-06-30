import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useLangtag } from '@/hooks/store/useLangtag'
import useExpressionQueryStore from '@/expressionStore'
import LangtagsList from './LangtagsList'
import useLanguageStore from '@/languageStore'

const LangtsgsSelector = () => {
  const lang = useLanguageStore(s => s.language)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const selectedTagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId
  )
  const selectedLangtag = useLangtag(selectedTagId)

  const header = `Select: ${selectedLangtag?.title || 'tags'}`
  const header_ch = `选择: ${selectedLangtag?.title_ch || '标签'}`

  return (
    <>
      <Button size='sm' onClick={onOpen}>
        {lang === 'en' ? header : header_ch}
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