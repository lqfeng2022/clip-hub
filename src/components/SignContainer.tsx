import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ClipLogo from './ClipLogo'
import ExpressionLogo from './ExpressionLogo'
import LanguageButton from './LanguageButton'

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
            <Link to='/expressions'><ExpressionLogo/></Link>
            <LanguageButton/>
          </HStack>
          {children}
        </Stack>
      </Box>
    </Flex>
  )
}

export default SignContainer