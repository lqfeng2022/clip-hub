import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ClipLogo = () => {
  return (
    <Link to='/'>
      <Box position='relative' display='inline-block'>
        <Text
          p='1px 15px'
          position='absolute' 
          zIndex={1}
          as='b' fontSize='2xl' 
          color='yellow'
          _hover={{ bg: 'gray.700', borderRadius: 'full' }}
          >
          C L I P
        </Text>
        <Text
          p='1px 15px'
          position='relative' 
          top='4px' left='2px'
          as='b' fontSize='2xl' 
          color='orange' 
          opacity='0.6'
        >
          C L I P
        </Text>
      </Box>
    </Link>
  )
}

export default ClipLogo