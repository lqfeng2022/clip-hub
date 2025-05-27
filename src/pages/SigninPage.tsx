import {
  Box, Button, FormControl, FormHelperText, Heading, HStack, 
  Input, InputGroup, InputRightElement, SimpleGrid, Stack, Text
} from '@chakra-ui/react'
import Logo from '../components/Logo'
import SignContainer from '../components/SignContainer'
import { useState } from 'react'
import useSignin from '../hooks/useSignin'

const SigninPage = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')

  const { mutate, error } = useSignin()
  const message = error 
    ? "Oops, something wrong..." 
    : "We'll never share your info."
  
  return (
    <SignContainer>
      <Stack p={10} gap={3}>
        <Logo/>
        <SimpleGrid columns={{sm: 1, md: 2}}>
          <Box mb={5}>
            <Heading fontSize='4xl'>Sign in</Heading>
            <Text pt={2}>to continue to CLIPs</Text>
          </Box>
          <Box>
            <FormControl>
              <Input 
                type='text' 
                placeholder='User name..'
                value={username}
                onChange={(un) => setUsername(un.target.value)}
              />
              <FormHelperText color={error ? 'red.300' : undefined}>
                {message}
              </FormHelperText>
            </FormControl>
            <FormControl py={6}>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(ps) => setPassword(ps.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={error ? 'red.300' : undefined}>
                {message}
              </FormHelperText>
            </FormControl>
            <Button 
              mb={5} 
              size='md' 
              fontSize='lg'
              onClick={() => mutate({ username, password })}
            >
              Log In
            </Button>
            <HStack justifyContent='end'>
              <Text>Don't have an account?</Text>
              <Button size='sm' variant='outline'>Sign up</Button>
            </HStack>
          </Box>
        </SimpleGrid>
      </Stack>
    </SignContainer>
  )
}

export default SigninPage