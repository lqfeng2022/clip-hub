import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useLangtag } from '@/hooks/store/useLangtag'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'
import Langtags from './Langtags'

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
      <Modal size='xs' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize='3xl' py={3}>
              {lang === 'en' ? 'Langtags' : '语言标签'}
            </Heading>
            <Langtags/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LangtsgsSelector