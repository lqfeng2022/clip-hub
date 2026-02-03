import { Box } from '@chakra-ui/react'

interface Props {
  startCall: () => void
}
const ChatCallInput = ({ startCall }: Props) => {
  return (
    <Box
      h='40px'
      borderRadius='5px'
      bg='gray.700'
      display='flex'
      alignItems='center'
      onClick={startCall}
    >
      <Box 
        w='100%' 
        textAlign='center' 
        py={2} 
        cursor='pointer'
        fontWeight='semibold'
        _hover={{ color: 'yellow' }}
      >
        Tap to Call
      </Box>
    </Box>
  )
}

export default ChatCallInput