import passwordInputData from '@/data/passwordInputData'
import useLanguageStore from '@/stores/languageStore'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ComponentProps, useState } from 'react'

interface Props {
  PasswordInput: ComponentProps<typeof Input>
}
const PasswordInput = ({ PasswordInput: props }: Props) => {
  const lang = useLanguageStore(s => s.language)
  const inputText = lang === 'en' ? passwordInputData.en : passwordInputData.zh

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
    
  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={inputText.placeholder}
        {...props}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? inputText.hide_lang : inputText.show_lang}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput