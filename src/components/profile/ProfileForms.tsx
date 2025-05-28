import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup, InputLeftElement,
  Text
} from '@chakra-ui/react'
import { CiPhone } from 'react-icons/ci'
import { MdAlternateEmail } from 'react-icons/md'

const ProfileForms = () => {
  return (
    <>
      <Box mb={5}>
        <Heading fontSize='lg'>Name</Heading>
        <Text pb={2}>
          Choose a name that represents you and your content.
        </Text>
        <HStack maxW='600px'>
          <FormControl>
            <Input
              placeholder='First name'
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder='Last name'
            />
          </FormControl>
        </HStack>
      </Box>
      <Box mb={5}>
        <Heading fontSize='lg'>Username</Heading>
        <Text pb={2}>
          Choose a name that represents you and your content.
        </Text>
        <FormControl maxW='600px'>
          <Input
            placeholder='Unique username'
          />
        </FormControl>
      </Box>
      <Box mb={5}>
        <Heading fontSize='lg'>Contact info</Heading>
        <Text pb={2}>
          Let us know how to contact you with better services.
        </Text>
        <FormControl maxW='600px' pb={3}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={MdAlternateEmail} boxSize={6} />
            </InputLeftElement>
            <Input
              type='email'
              placeholder='Email address'
            />
          </InputGroup>
        </FormControl>
        <FormControl maxW='600px'>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={CiPhone} boxSize={6} />
            </InputLeftElement>
            <Input 
              type='tel' 
              placeholder='Phone number' 
            />
          </InputGroup>
        </FormControl>
      </Box>
      <Box mb={5}>
        <Heading fontSize='lg'>Birthday</Heading>
        <Text pb={2}>
          Choose a date as your birthday, maybe, you're gonna get some surprise.
        </Text>
        <FormControl maxW='600px'>
          <Input
            type='datetime-local'
            placeholder='Your birthday'
          />
        </FormControl>
      </Box>
    </>
  )
}

export default ProfileForms