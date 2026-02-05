import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'

interface Props {
  isRecording: boolean
  audioURL: string | null
  toggleRecording: () => void
  confirmSend: () => void
}
const ChatAudioInput = ({ 
  isRecording, 
  audioURL, 
  toggleRecording, 
  confirmSend, 
}: Props) => {
  // Auto-send when recording finishes
  useEffect(() => {
    if (audioURL && !isRecording) {
      // Small delay to ensure audio is ready
      const timer = setTimeout(() => {
        confirmSend()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [audioURL, isRecording, confirmSend])

  return (
    <Box
      h='40px'
      borderRadius='5px'
      bg={isRecording ? 'red.400' : 'gray.700'}
      display='flex'
      alignItems='center'
      onClick={!audioURL ? toggleRecording : undefined}
    >
      <Box 
        w='100%' 
        textAlign='center' 
        py={2} 
        cursor='pointer'
        fontWeight='semibold'
        _hover={{ color: 'yellow' }}
      >
        {isRecording ? 'Recording…' : 'Tap to Record'}
      </Box>
    </Box>
  )
}

export default ChatAudioInput