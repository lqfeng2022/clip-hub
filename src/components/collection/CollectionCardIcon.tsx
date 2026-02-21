import { Box, Icon, Text } from '@chakra-ui/react'
import { FaFolder } from 'react-icons/fa'

const CollectionCardIcon = ({ count }: { count: number }) => {
  return (
    <Box position='absolute' bottom={0} right={2}>
      {/* Folder Icon */}
      <Icon
        as={FaFolder}
        boxSize={10}
        color='yellow.300'
        p={1.5}
        bg='rgba(0,0,0,0.4)'
        borderRadius='lg'
        opacity={0.8}
      />
      {/* Badge */}
      <Box
        position='absolute'
        top='12px'
        right='8px'
        minW='20px'
        h='20px'
        px={1}
        borderRadius='full'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='gray.500'
        >
          {count > 999 ? '999+' : count}
        </Text>
      </Box>
    </Box>
  )
}

export default CollectionCardIcon