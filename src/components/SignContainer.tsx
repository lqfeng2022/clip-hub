import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import ClipLogo from './ClipLogo'
import { Link } from 'react-router-dom'
import EpLogo from './EpLogo'

const SignContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex 
      justifyContent='center' 
      alignItems='center' 
      height={{md: '100vh'}} 
    >
      <Box 
        border={{md:'1px'}} 
        borderColor='gray' 
        w='full' 
        maxW='750px' 
        borderRadius='15px'
        m={{md: '40px 12px'}}
      >
        <Stack p={10} gap={3}>
          <HStack gap={5}>
            <Link to='/'><ClipLogo/></Link>
            <Link to='/expressions'><EpLogo/></Link>
          </HStack>
          {children}
        </Stack>
      </Box>
    </Flex>
  )
}

export default SignContainer