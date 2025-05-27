import {
  Box, Button, FormControl, FormHelperText, FormLabel, Heading, 
  HStack, Input, SimpleGrid, Stack, Text
} from '@chakra-ui/react'
import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'

const SignupPage = () => {
  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

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
              onChange={(un) => setPassword(un.target.value)}
            />
            <FormHelperText>pk field</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Set your password</FormLabel>
            <PasswordInput value={password} onChange={setPassword}/>
            <FormHelperText>Data validation</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm your password</FormLabel>
            <PasswordInput value={password2} onChange={setPassword2}/>
            <FormHelperText>
              {password2 === password ? 
                'You really got your pw, bro' : 'You gotta confirm it again..'
              }
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' value={email} />
            <FormHelperText>pk field</FormHelperText>
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' value={fname}/>
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' value={lname} />
            </FormControl>
          </HStack>
          <Button mt={2} size='md' fontSize='lg'>
            Sign up
          </Button>
        </Stack>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SignupPage