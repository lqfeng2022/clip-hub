import { Box, HStack, Badge } from '@chakra-ui/react'
import ChatAudioBoxSimple from './ChatAudioBoxSimple'

interface Props {
  isRecording: boolean
  audioURL: string | null
  toggleRecording: () => void
  confirmSend: () => void
  cleanup: () => void
}
const ChatAudioInput = ({ 
  isRecording, 
  audioURL, 
  toggleRecording, 
  confirmSend, 
  cleanup 
}: Props) => {
  return (
    <Box
      h='40px'
      borderRadius='5px'
      bg={isRecording ? 'red.400' : 'gray.700'}
      display='flex'
      alignItems='center'
      onClick={!audioURL ? toggleRecording : undefined}
    >
      {!audioURL ? (
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
      ) : (
        <HStack w='100%' justifyContent='space-between' pr={5}>
          <ChatAudioBoxSimple audioUrl={audioURL} />
          <HStack gap={5}>
            <Badge 
              cursor='pointer' 
              colorScheme='red'
              fontWeight='light'
              onClick={cleanup}
            >
              Discard
            </Badge>
            <Badge 
              cursor='pointer' 
              colorScheme='green'
              fontWeight='light'
              onClick={confirmSend}
            >
              Send
            </Badge>
          </HStack>
        </HStack>
      )}
    </Box>
  )
}

export default ChatAudioInput