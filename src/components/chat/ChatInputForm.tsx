import ChatMessage from '@/entities/ChatMessage'
import ChatSession from '@/entities/ChatSession'
import { autoGrow } from '@/helps/autoGrow'
import { voiceRecorder } from '@/helps/voiceRecorder'
import useChatMessagePost from '@/hooks/interact/useChatMessagePost'
import { ChatForm, chatSchema } from '@/validation/chatSchema'
import { Badge, Box, FormControl, HStack, Icon, InputGroup, Stack, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiKeyboard, CiMicrophoneOn, CiPhone } from 'react-icons/ci'
import { GoSmiley } from 'react-icons/go'
import { IoAddOutline, IoVideocamOutline } from 'react-icons/io5'
import ChatAudioBoxSimple from './ChatAudioBoxSimple'

interface Props {
  chatSession: ChatSession,
  disabledClear: boolean, 
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>, // a state setter function
}
const ChatInputForm = ({ chatSession, setMessages }: Props) => {
  // HOOK
  const chatId = chatSession?.id
  const { mutate: postChatMessage } = useChatMessagePost(chatId!)

  // FORM
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema)
  })

  // LOCAL STATE
  const [isSpeakOn, setIsSpeakOn] = useState(false)
  const [isHostSpeakOn, setIsHostSpeakOn] = useState(false)
  const [isEnhancement, setIsEnhancement] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent breaking IME input (Chinese, Japanese, etc.)
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter') {
      // Shift + Return/Enter -> new line
      if (e.shiftKey) return

      // Enter alone -> submit
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  // TEXT SUBMIT
  const onSubmit = (data: ChatForm) => {
    if (!chatId) return

    // optimistically user message
    const userMessage: ChatMessage = {
      id: Date.now(), // temporary ID
      role: 'user',
      content: data.content,
      audio: null,
      is_voice: isHostSpeakOn,
      is_enhancement: isEnhancement,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    reset()

    // send text message to backend then append it locally
    postChatMessage({ 
      type: 'text', 
      content: data.content, 
      is_voice: isHostSpeakOn, 
      is_enhancement: isEnhancement 
    }, {
      onSuccess: (assistantMessage) => {
        if (!assistantMessage) return
        setMessages(prev => [...prev, assistantMessage])
      },
    })
  }

  // AUDIO LOGIC
  const { 
    toggleRecording, 
    isRecording, 
    audioURL, 
    confirmSend, 
    cleanup 
  } = voiceRecorder({
    onConfirmSend: (blob) => {
      if (!chatId) return

      // optimistic audio message
      const userMessage: ChatMessage = {
        id: Date.now(),
        role: 'user',
        content: null,
        is_voice: isHostSpeakOn,
        is_enhancement: isEnhancement,
        audio: URL.createObjectURL(blob), // local preview
        created_at: new Date().toISOString(),
      }

      setMessages(prev => [...prev, userMessage])

      postChatMessage({ 
        type: 'audio', 
        audio: blob, 
        is_voice: isHostSpeakOn, 
        is_enhancement: isEnhancement
      }, {
        onSuccess: (assistantMessage) => {
          if (!assistantMessage) return
          setMessages(prev => [...prev, assistantMessage])
        },
      })
    },
  })

  // UI
  const renderTextInput = () => (
    <InputGroup size='sm'>
      <Textarea
        {...register('content')}
        resize='none'
        overflowY='auto'
        p={1}
        minH='40px'
        maxH='150px'
        lineHeight='1.5'
        fontSize='16px'
        placeholder='Type a message...'
        onInput={autoGrow}
        onKeyDown={handleKeyDown}
        border='none'
        _focus={{ border: 'none', boxShadow: 'none' }}
        />
    </InputGroup>
  )
  
  const renderAudioInput = () => (
    <Box
      h='40px'
      borderRadius='5px'
      bg={isRecording ? 'red.500' : 'gray.700'}
      display='flex'
      alignItems='center'
      onClick={!audioURL ? toggleRecording : undefined}
      >
        {!audioURL ? (
          <Box w='100%' textAlign='center' py={2} cursor='pointer'>
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

  const chatMode = isSpeakOn ? 'audio' : 'text'
  const chatModeColorScheme = isSpeakOn ? 'green' : 'blue'
  const chatModeLabel = `${chatMode}-${isHostSpeakOn ? 'tts' : 'plain'}`

  return (
    <Box px={3} my={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack 
          spacing={0} 
          align='stretch'
          border='1px'
          p={2}
          borderColor='gray.500'
          borderRadius='15px'
          _hover={{bg: 'RGBA(0, 0, 0, 0.22)'}}
        >
          {/* Input render */}
          <FormControl isInvalid={!!errors.content}>
            {isSpeakOn ? renderAudioInput() : renderTextInput()}
          </FormControl>
          {/* Footer controls */}
          <HStack justifyContent='space-between' pt={1.5} textAlign='center'>
            <HStack gap={4}>
              {/* ADD files(images, videos, text, pdf...) */}
              <Icon as={IoAddOutline} boxSize={6} color='gray'/>
              {/* CHAT mode: TEXT or AUDIO */}
              <Icon 
                as={isSpeakOn ? CiKeyboard : CiMicrophoneOn} 
                boxSize={6} 
                cursor='pointer'
                onClick={() => {
                  setIsSpeakOn(prev => !prev)
                  setIsHostSpeakOn(prev => !prev)
                  if (isEnhancement) setIsEnhancement(prev => !prev)
                }}
              />
              {/* CALL mode */}
              <Icon as={CiPhone} boxSize={6} color='gray'/>
              {/* VIDEO CALL mode */}
              <Icon as={IoVideocamOutline} boxSize={6} color='gray'/>
              {isHostSpeakOn && <Icon 
                boxSize={5}
                as={GoSmiley} 
                cursor='pointer'
                color={isEnhancement ? 'orange.200' : 'gray.100'}
                onClick={() => setIsEnhancement(prev => !prev)}/>
              }
            </HStack>
            <Badge
              fontSize='0.8em'
              fontWeight={isEnhancement ? 'bold' : 'light'}
              colorScheme={chatModeColorScheme}
            >
              {chatModeLabel}
            </Badge>
          </HStack>
        </Stack>
      </form>
    </Box>
  )
}

export default ChatInputForm