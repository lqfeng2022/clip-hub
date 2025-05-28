import {
  Box, Button, Heading, HStack,
  Image,
  SimpleGrid, Text
} from '@chakra-ui/react'

const ProfileBackimage = () => {
  return (
    <Box mb={5}>
      <Heading fontSize='lg'>Back image</Heading>
      <Text pb={2}>
        This image will appear across the top of your channel
      </Text>
      <SimpleGrid gap={4} columns={{ sm: 1, lg: 2 }}>
        <Box
          height='160px'
          borderRadius={5}
          overflow='hidden'
          bg='gray.500'
        >
          <Image src='https://bit.ly/naruto-sage'/>
        </Box>
        <HStack gap={5} alignSelf='flex-start'>
          <Button size='sm' colorScheme='gray' variant='outline'>
            Change
          </Button>
          <Button size='sm' colorScheme='gray' variant='outline'>
            Remove
          </Button>
        </HStack>
      </SimpleGrid>
    </Box>
  )
}

export default ProfileBackimage