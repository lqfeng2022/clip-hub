import {
  Box, Button, FormControl, FormHelperText,
  FormLabel, Heading,
  HStack, Input, SimpleGrid, Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'
import useSignin from '../hooks/useSignin'
import ProfileAPIClient from '../services/api-profile'

const SigninPage = () => {
  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { mutate, error } = useSignin()
  const message = error 
    ? "Oops, something wrong..." 
    : "We'll never share your info."

  const { setUser } = useAuth()
  const apiClient = new ProfileAPIClient('/me/')

  const handleSignin = () => {
    mutate({ username, password }, {
      onSuccess: () => {
        apiClient.get({ withCredentials: true }).then(setUser);
        navigate('/profile')
        window.location.reload() // clear auth context
      }
    })
  }
  
  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        <Box mb={5}>
          <Heading fontSize='4xl'>Sign in</Heading>
          <Text pt={2}>to continue to CLIPs</Text>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>User name :</FormLabel>
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
          <FormControl py={8}>
            <FormLabel>Enter your password :</FormLabel>
            <PasswordInput value={password} onChange={setPassword}/>
            <FormHelperText color={error ? 'red.300' : undefined}>
              {message}
            </FormHelperText>
          </FormControl>
          <Button mb={5} size='md' fontSize='lg' onClick={handleSignin}>
            Log In
          </Button>
          <HStack justifyContent='end' gap={5}>
            <Text>Don't have an account?</Text>
            <Link to='/user/signup'>
              <Button size='sm' variant='outline' colorScheme='yellow'>
                Sign up
              </Button>
            </Link>
          </HStack>
        </Box>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SigninPage