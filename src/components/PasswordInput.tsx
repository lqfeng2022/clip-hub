import useLanguageStore from '@/languageStore'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}
const PasswordInput = ({ value, onChange }: Props) => {
  const lang = useLanguageStore(s => s.language)
  const placeholder = lang === 'en' ? 'Enter password' : '输入密码'
  const hide_lang = lang === 'en' ? 'Hide' : '隐藏'
  const show_lang = lang === 'en' ? 'Show' : '显示'

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
    
  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(ps) => onChange(ps.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? hide_lang : show_lang}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput