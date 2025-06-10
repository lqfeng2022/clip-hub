import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'
import Clip from '../../entities/Clip'
import InteractBookmark from './InteractBookmark'
import InteractLike from './InteractLike'

const InteractIconList = ({ clip }: { clip: Clip }) => {
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        <InteractLike clip={clip}/>
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{clip.views_count}</Text>
        </HStack>
        <InteractBookmark clip={clip}/>
        <Icon as={BiShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default InteractIconList