import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FaRegComment, FaShare } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'
import Clip from '../../entities/Clip'
import InteractBookmark from './InteractBookmark'
import InteractLike from './InteractLike'

interface Props {
  clip: Clip
}
const InteractIconList = ({ clip }: Props) => {
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        <InteractLike clip={clip}/>
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{clip.views}</Text>
        </HStack>
        <InteractBookmark clip={clip}/>
        <Icon as={FaShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default InteractIconList