import { Box, FormControl, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { CiPhone } from 'react-icons/ci'
import { MdAlternateEmail } from 'react-icons/md'
import User from '../../entities/User'

const ProfileForms = ({ user }: { user: User }) => {
  return (
    <>
      {/* 1)Name (first_anme / last_name) */}
      <Box mb={7}>
        <Heading fontSize='lg'>Name</Heading>
        <Text py={2}>
          Choose a name that represents you and your content.
        </Text>
        <HStack maxW='600px'>
          <FormControl>
            <Input
              placeholder='First name'
              value={user.first_name}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder='Last name'
              value={user.last_name}
            />
          </FormControl>
        </HStack>
      </Box>
      {/* 2)Contact info (email/phone) */}
      <Box mb={7}>
        <Heading fontSize='lg'>Contact info</Heading>
        <Text py={2}>
          Let us know how to contact you with better services.
        </Text>
        <FormControl maxW='600px' pb={3}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={MdAlternateEmail} boxSize={6} color='gray' />
            </InputLeftElement>
            <Input
              type='email'
              placeholder='Email address'
              value={user.email}
            />
          </InputGroup>
        </FormControl>
        <FormControl maxW='600px'>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={CiPhone} boxSize={6} color='gray' />
            </InputLeftElement>
            <Input 
              type='tel' 
              placeholder='Phone number' 
              value={user.phone}
            />
          </InputGroup>
        </FormControl>
      </Box>
      {/* 3)Birthday form */}
      <Box mb={7}>
        <Heading fontSize='lg'>Birthday</Heading>
        <Text py={2}>
          Choose a date as your birthday, maybe, you're gonna get some surprise.
        </Text>
        <FormControl maxW='600px'>
          <Input
            // 'datetime-local': change it to match Django’s DateField.
            type='date'
            placeholder='Your birthday'
            value={user.birth_date ?? ''}
          />
        </FormControl>
      </Box>
    </>
  )
}

export default ProfileForms