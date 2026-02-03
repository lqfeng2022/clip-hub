import { Textarea, InputGroup } from '@chakra-ui/react'
import { autoGrow } from '@/helps/autoGrow'
import { UseFormRegister } from 'react-hook-form'
import { ChatForm } from '@/validation/chatSchema'

interface Props {
  register: UseFormRegister<ChatForm>
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}
const ChatTextInput = ({ register, handleKeyDown }: Props) => {
  return (
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
}

export default ChatTextInput