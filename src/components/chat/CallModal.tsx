import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react'
import RealtimeCall from './RealtimeCall'
import Host from '@/entities/Host'

interface Props {
  callId: string
  host: Host
  isOpen: boolean
  onClose: () => void
}
const CallModal = ({ host, isOpen, onClose, callId }: Props) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size='sm'
      isCentered
      closeOnOverlayClick={false}  // Disable click outside to close
      closeOnEsc={false}           // Optional: Disable ESC to close
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize='md' color='gray.200'>
          Realtime Call
        </ModalHeader>
        <ModalBody>
          {callId && (
            <RealtimeCall 
              callId={callId} 
              host={host} 
              onCallEnd={onClose}   // Only phone icon ends the call
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CallModal