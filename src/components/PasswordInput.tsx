import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
    
  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={value}
        onChange={(ps) => onChange(ps.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput