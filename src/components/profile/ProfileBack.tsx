import { Box, Text } from '@chakra-ui/react'

const ProfileBack = () => {
  return (
    <Box
      height='160px'
      borderRadius={5}
      bgGradient='linear(to-r, gray.200, gray.400, gray.600)'
    >
      <Text p={5}>
        Hey there! I’m <strong>Simon Lee</strong>, the creator of <i>ClipWords</i>. 
        I’m creating <strong>a fun AI agent</strong> on top of our English Expression database. 
        Think of it as <strong>a friendly companion</strong> — witty, supportive, and always up 
        for a conversation — here to help you learn.
      </Text>
    </Box>
  )
}

export default ProfileBack