import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSignup from '../hooks/useSignup'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'

const SignupPage = () => {
  const { mutate, error }= useSignup()
  const navigate = useNavigate()

  const [signup, setSignup] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
  })

  const handleChange = (field: keyof typeof signup) => {
    (e: ChangeEvent<HTMLInputElement> | string) => {
      // if e is typeof `string`, return it directly,
      // otherwise return e.target.value, cus it's type of `ChangeEvent`
      const value = (typeof e === 'string') ? e : e.target.value
      setSignup(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSignup = () => {
    const { password2, ...payload } = signup
    mutate( payload, { onSuccess: () => navigate('/user/signin') })
  }

  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNUP header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>Sign up</Heading>
          <Text pt={2}>to start to CLIPs</Text>
        </Box>
        <Stack spacing={5}>
          {/* INPUT username */}
          <FormControl isRequired>
            <FormLabel>User name</FormLabel>
            <Input 
              type='text' 
              placeholder='User name..'
              value={signup.username}
              onChange={() => handleChange('username')}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          {/* SET password */}
          <FormControl isRequired>
            <FormLabel>Set your password</FormLabel>
            <PasswordInput 
              value={signup.password} 
              onChange={() => handleChange('password')}
            />
            <FormHelperText>Data validation</FormHelperText>
          </FormControl>
          {/* CONVORM password */}
          <FormControl isRequired>
            <FormLabel>Confirm your password</FormLabel>
            <PasswordInput 
              value={signup.password2} 
              onChange={() => handleChange('password2')}
            />
            {signup.password2 === signup.password ? 
              <FormHelperText>
                You really got your pw, bro
              </FormHelperText>
              :
              <FormHelperText color='red.300'>
                Hey, you gotta hit it again, bro
              </FormHelperText>
            }
          </FormControl>
          {/* INPUT EMAIL */}
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input 
              type='email'
              placeholder='Enter your email'
              value={signup.email} 
              onChange={() => handleChange('email')}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          {/* GIVE first_name/last_name optionally */}
          <HStack>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input 
                placeholder='First name' 
                value={signup.first_name}
                onChange={() => handleChange('first_name')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input 
                placeholder='Last name' 
                value={signup.last_name} 
                onChange={() => handleChange('last_name')}
              />
            </FormControl>
          </HStack>
          {/* SIGN UP submit button */}
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