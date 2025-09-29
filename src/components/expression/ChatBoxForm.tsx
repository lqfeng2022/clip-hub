import ChatMessage from '@/entities/ChatMessage'
import ChatSession from '@/entities/ChatSession'
import { autoGrow } from '@/helperfunction'
import useChatMessagePost from '@/hooks/interact/useChatMessagePost'
import { ChatForm, chatSchema } from '@/validation/chatSchema'
import { Button, Flex, FormControl, FormHelperText, InputGroup, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  chatSession: ChatSession,
  disabledClear: boolean, 
  onClear: () => void,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>, // a state setter function
}
const ChatBoxForm = ({ chatSession, disabledClear, onClear, setMessages }: Props) => {
  const chatId = chatSession?.id
  const { mutate: postChatMessage } = useChatMessagePost(chatId!)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema)
  })
  
  const onSubmit = (data: ChatForm) => {
    if (!chatId) return  // if no chatSession, do nothing here

    // 1) Optimistically show user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: data.content,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])

    // 2) Send to backend
    if (!chatSession?.id) return // safer guarantee
    postChatMessage({ content: data.content }, {
      onSuccess: (assistantMessage) => {
        // 3) Immediately append assistant reply
        setMessages(prev => [...prev, { ...assistantMessage }])
      },
      onSettled: () => reset() // clear textarea
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.content}>
        <InputGroup p='28px 8px 5px'>
          <Textarea
            {...register('content')}
            resize='none'
            overflow='hidden'
            minH='40px'
            placeholder='Type a message...'
            onInput={autoGrow}
          />
        </InputGroup>
        <FormHelperText color='red.300' p='0px 8px 10px'>
          {errors.content?.message}
        </FormHelperText>
      </FormControl>
      <Flex justify='space-between' mx={2} my={5}>
        <Button size='sm' type='submit'>Submit</Button>
        <Button 
          size='sm' 
          onClick={onClear} 
          isDisabled={disabledClear}
        >
          Clear Chat
        </Button>
      </Flex>
    </form>
  )
}

export default ChatBoxForm