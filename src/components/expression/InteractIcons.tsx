import Expression from '@/entities/Expression'
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'
import InteractIconSave from './InteractIconSave'
import ExpressionInteractLike from './ExpressionInteractLike'

const InteractIcons = ({ expression }: { expression: Expression }) => {  
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        {/* expression like */}
        <HStack>
          <ExpressionInteractLike expression={expression}/>
          <Text>{expression.likes_count}</Text>
        </HStack>
        {/* expression view history */}
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{expression.views_count}</Text>
        </HStack>
        {/* expression list */}
        <InteractIconSave exp={expression}/>
        <Icon as={BiShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default InteractIcons