import Expression from '@/entities/Expression'
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { IoIosChatboxes } from 'react-icons/io'
import { IoEyeOutline } from 'react-icons/io5'
import InteractIconSave from './InteractIconSave'
import ExpressionInteractLike from './ExpressionInteractLike'

interface Props {
  expression: Expression,
  chatOpen: boolean,
  onChatToggle: () => void,
}
const InteractIcons = ({ expression, chatOpen, onChatToggle }: Props) => {  
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        {/* AI agent chat */}
        <Icon 
          as={IoIosChatboxes} 
          boxSize={6} 
          color={chatOpen ? 'green' : ''}
          onClick={onChatToggle} 
          cursor='pointer'
        />
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
        <Icon as={BiShare} boxSize={6} color='gray'/>
      </HStack>
    </Stack>
  )
}

export default InteractIcons