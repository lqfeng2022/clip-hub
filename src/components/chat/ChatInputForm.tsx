import ChatMessage from '@/entities/ChatMessage'
import ChatSession from '@/entities/ChatSession'
import { voiceRecorder } from '@/helps/voiceRecorder'
import { useCallPost } from '@/hooks/interact-call/useCallPost'
import useChatMessagePost from '@/hooks/interact-chat/useChatMessagePost'
import { ChatForm, chatSchema } from '@/validation/chatSchema'
import { Box, FormControl, Stack, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import CallModal from './CallModal'
import ChatAudioInput from './ChatAudioInput'
import ChatCallInput from './ChatCallInput'
import ChatInputControls from './ChatInputControls'
import ChatTextInput from './ChatTextInput'
import { handleEnterSubmit } from '@/helps/handleKeyDown'

interface Props {
  chatSession: ChatSession,
  disabledClear: boolean, 
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>, // a state setter function
}
const ChatInputForm = ({ chatSession, setMessages }: Props) => {
  // HOOK & FORM
  const chatId = chatSession?.id
  const { mutate: postChatMessage } = useChatMessagePost(chatId!)
  const { callId, startCall, endCall } = useCallPost(chatId!)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema)
  })

  // LOCAL UI STATE
  const [isSpeakOn, setIsSpeakOn] = useState(false)
  const [isEnhancement, setIsEnhancement] = useState(false)
  const [isCalling, setIsCalling] = useState(false) // show "Tap to Call" button

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  // TEXT SUBMIT
  const onSubmit = (data: ChatForm) => {
    if (!chatId) return

    // optimistically user message
    const userMessage: ChatMessage = {
      id: Date.now(), // temporary ID
      role: 'user',
      content: data.content,
      audio: null,
      audio_seconds: 0,
      is_voice: isSpeakOn,
      is_enhancement: isEnhancement,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    reset()

    // send text message to backend then append it locally
    postChatMessage({ 
      type: 'text', 
      content: data.content, 
      is_voice: isSpeakOn, 
      is_enhancement: isEnhancement 
    }, {
      onSuccess: (assistantMessage) => {
        if (!assistantMessage) return
        setMessages(prev => [...prev, assistantMessage])
      },
    })
  }
  // Dynamical Input Box
  const handleKeyDown = handleEnterSubmit(handleSubmit, onSubmit)

  // AUDIO LOGIC
  const { toggleRecording, isRecording, audioURL, confirmSend } = voiceRecorder({
    onConfirmSend: (blob) => {
      if (!chatId) return

      // optimistic audio message
      const userMessage: ChatMessage = {
        id: Date.now(),
        role: 'user',
        content: null,
        audio_seconds: 0,
        is_voice: isSpeakOn,
        is_enhancement: isEnhancement,
        audio: URL.createObjectURL(blob), // local preview
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])
      postChatMessage({ 
        type: 'audio', 
        audio: blob, 
        is_voice: isSpeakOn, 
        is_enhancement: isEnhancement
      }, {
        onSuccess: (assistantMessage) => {
          if (!assistantMessage) return
          setMessages(prev => [...prev, assistantMessage])
        },
      })
    }
  })

  // UI RENDERS
  const renderInput = () => {
    if (isCalling) return <ChatCallInput startCall={() => startCall(onOpen)} />
    if (isSpeakOn) return (
      <ChatAudioInput 
        isRecording={isRecording}
        audioURL={audioURL}
        toggleRecording={toggleRecording}
        confirmSend={confirmSend}
      />
    )
    return <ChatTextInput register={register} handleKeyDown={handleKeyDown} />
  }

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
            {renderInput()}
          </FormControl>
          {/* Footer controls */}
          <ChatInputControls
            isSpeakOn={isSpeakOn}
            isCalling={isCalling}
            isEnhancement={isEnhancement}
            onToggleSpeak={() => {
              setIsSpeakOn(prev => !prev)
              if (isCalling) setIsCalling(false)
              if (isEnhancement) setIsEnhancement(false)
            }}
            onToggleCall={() => {
              setIsCalling(prev => !prev)
              if (isSpeakOn) setIsSpeakOn(false)
              if (isEnhancement) setIsEnhancement(false)
            }}
            onToggleEnhancement={() => setIsEnhancement(prev => !prev)}
          />
        </Stack>
      </form>
      {/* Mount the Modal Once */}
      <CallModal 
        host={chatSession.host}
        isOpen={isOpen}
        onClose={() => {
          endCall()
          setIsCalling(false)
          onClose()
        }}
        callId={callId!}
      />
    </Box>
  )
}

export default ChatInputForm