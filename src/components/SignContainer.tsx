import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}
const SignContainer = ({ children }: Props) => {
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
          <Link to='/'>
            <Button variant='outline'>
              <Logo/>
            </Button>
          </Link>
          {children}
        </Stack>
      </Box>
    </Flex>
  )
}

export default SignContainer