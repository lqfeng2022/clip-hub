import Expression from '@/entities/Expression'
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { IoBookmarkOutline, IoEyeOutline, IoHeartOutline } from 'react-icons/io5'

const ExpressionInteractIcons = ({ expression }: { expression: Expression }) => {
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        {/* exp like */}
        <HStack>
          <Icon as={IoHeartOutline} boxSize={6}/>
          <Text>20k</Text>
        </HStack>
        {/* exp view */}
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>110k</Text>
        </HStack>
        {/* expression playlist */}
        <Icon as={IoBookmarkOutline} boxSize={6}/>
        <Icon as={BiShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default ExpressionInteractIcons