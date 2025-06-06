import { Box, Button, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react'
import User from '../../entities/User'

const ProfileCover = ({ user }: { user: User }) => {
  const defaultImg = 'https://bit.ly/naruto-sage'

  return (
    <Box mb={5}>
      <Heading fontSize='lg'>Back image</Heading>
      <Text py={2}>
        This image will appear across the top of your channel
      </Text>
      <SimpleGrid 
        columns={{ sm: 1, lg: 2 }} 
        templateColumns={{lg: '1fr 200px'}}
        gap={4}
      >
        <Box
          height='160px'
          borderRadius={5}
          overflow='hidden'
          bg='gray.500'
        >
          <Image src={user.back_image ?? defaultImg}/>
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

export default ProfileCover