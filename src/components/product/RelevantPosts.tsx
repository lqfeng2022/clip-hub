import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Relevants from './Relevants'

const RelevantPosts = () => {
  return (
    <Box>
      <Stack spacing='0' height='65px' py={2} pl={3}>
        <Heading fontSize='xl'>
          Discover more
        </Heading>
        <Text fontSize='sm' color='gray.400'>
          Relevant contents
        </Text>
      </Stack>
      <Relevants/>
    </Box>
  )
}

export default RelevantPosts