import { 
  Box, Button, Flex, FormControl, FormHelperText, Heading, HStack, 
  Input, SimpleGrid, Stack, Text } from '@chakra-ui/react'

const SigninPage = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <Box 
        border='1px' 
        borderColor='gray' 
        w='full' 
        maxW='750px' 
        borderRadius='15px'
        m='40px 12px'
      >
        <Stack p={10} gap={3}>
          <Text
            as='b'
            fontSize='2xl'
            color='yellow'
            whiteSpace='nowrap'
            textShadow='1px 2px 3px #B7791F'
          >
            C L I P s
          </Text>
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
      </Box>
    </Flex>
  )
}

export default SigninPage