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
        {/* expression likes count */}
        <HStack>
          <Icon as={IoHeartOutline} boxSize={6}/>
          <Text>{expression.likes_count}</Text>
        </HStack>
        {/* expression views count */}
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{expression.views_count}</Text>
        </HStack>
        {/* expression playlist */}
        <Icon as={IoBookmarkOutline} boxSize={6}/>
        <Icon as={BiShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default ExpressionInteractIcons