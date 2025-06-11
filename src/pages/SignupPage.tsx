import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'
import useSignup from '../hooks/useSignup'

const SignupPage = () => {
  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [first_name, setFirstname] = useState('')
  const [last_name, setLastname] = useState('')

  const { mutate, error }= useSignup()
  const navigate = useNavigate()

  const handleSignup = () => {
    mutate({ username, password, email, first_name, last_name }, {
      onSuccess: () => {
        navigate('/user/signin')
      }
    })
  }

  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        <Box mb={5}>
          <Heading fontSize='4xl'>Sign up</Heading>
          <Text pt={2}>to start to CLIPs</Text>
        </Box>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>User name</FormLabel>
            <Input 
              type='text' 
              placeholder='User name..'
              value={username}
              onChange={(un) => setUsername(un.target.value)}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Set your password</FormLabel>
            <PasswordInput 
              value={password} 
              onChange={setPassword}
            />
            <FormHelperText>Data validation</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm your password</FormLabel>
            <PasswordInput 
              value={password2} 
              onChange={setPassword2}
            />
            {password2 === password ? 
              <FormHelperText>
                You really got your pw, bro
              </FormHelperText>
              :
              <FormHelperText color='red.300'>
                Hey, you gotta hit it again, bro
              </FormHelperText>
            }
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input 
              type='email'
              placeholder='Enter your email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input 
                placeholder='First name' 
                value={first_name}
                onChange={(fn) => setFirstname(fn.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input 
                placeholder='Last name' 
                value={last_name} 
                onChange={(ln) => setLastname(ln.target.value)}
              />
            </FormControl>
          </HStack>
          <Button 
            mt={2} 
            size='md' 
            fontSize='lg' 
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Stack>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SignupPage