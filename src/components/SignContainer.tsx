import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

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
        {children}
      </Box>
    </Flex>
  )
}

export default SignContainer