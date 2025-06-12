import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import useSignin from '../hooks/useSignin'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'

const SigninPage = () => {
  const { mutate, error } = useSignin()
  const { fetchUser } = useAuth()
  const navigate = useNavigate()

  const [signin, setSignin] = useState({ username: '', password: '' })

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignin(prev => ({ ...prev, username: e.target.value }))
  }
  const handlePasswordChange = (value: string) => {
    setSignin(prev => ({ ...prev, password: value }))
  }

  const message = error 
    ? 'Oops, something wrong..' : 'Protect your personal info..'

  const handleSignin = () => {
    mutate(signin, {
      onSuccess: () => {
        fetchUser()
        navigate('/profile')
        window.location.reload() // clear auth context
      }
    })
  }
  
  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNIN header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>Sign in</Heading>
          <Text pt={2}>to continue to CLIPs</Text>
        </Box>
        <Box>
          {/* INPUT username */}
          <FormControl>
            <FormLabel>User name :</FormLabel>
            <Input 
              type='text' 
              placeholder='User name..'
              value={signin.username}
              onChange={handleUsernameChange}
            />
            <FormHelperText color={error ? 'red.300' : undefined}>
              {message}
            </FormHelperText>
          </FormControl>
          {/* ENTER password */}
          <FormControl py={8}>
            <FormLabel>Enter your password :</FormLabel>
            <PasswordInput 
              value={signin.password} 
              onChange={handlePasswordChange}
            />
            <FormHelperText color={error ? 'red.300' : undefined}>
              {message}
            </FormHelperText>
          </FormControl>
          {/* LOGIN button */}
          <Button mb={5} size='md' fontSize='lg' onClick={handleSignin}>
            Log In
          </Button>
          {/* SIGN UP if you haven't an account */}
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