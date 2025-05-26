import {
  Box, Button, FormControl, FormHelperText, 
  Heading, HStack, Input, SimpleGrid, Stack, Text
} from '@chakra-ui/react'
import Logo from '../components/Logo'
import SignContainer from '../components/SignContainer'

const SigninPage = () => {
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
              <Input type='email' placeholder='Email..'/>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl py={6}>
              <Input type='password' placeholder='Password..'/>
              <FormHelperText>Please protect your password.</FormHelperText>
            </FormControl>
            <Button mb={5} size='md' fontSize='lg'>Log In</Button>
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