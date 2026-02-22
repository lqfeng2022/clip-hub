import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { IoMdSchool } from 'react-icons/io'

const CourseCardIcon = ({ count }: { count: number }) => {
  return (
    <Box position='absolute' bottom={2} right={2}>
      <HStack
        bg='rgba(0,0,0,0.4)'
        borderRadius='lg'
        spacing={0}
        px={2}
      >
        {/* Folder Icon */}
        <Icon
          as={IoMdSchool}
          boxSize={6}
          color='yellow.300'
          p={1}
        />
        <Text
          fontSize='sm'
          fontWeight='semibold'
          pr={0.5}
        >
          {count > 999 ? '999+' : count}
        </Text>
      </HStack>
    </Box>
  )
}

export default CourseCardIcon