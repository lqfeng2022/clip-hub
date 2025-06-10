import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'
import Clip from '@/entities/Clip'
import ClipInteractIconSave from './ClipInteractIconSave'
import ClipInteractIconLike from './ClipInteractIconLike'

const ClipInteractIcons = ({ clip }: { clip: Clip }) => {
  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        <ClipInteractIconLike clip={clip}/>
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{clip.views_count}</Text>
        </HStack>
        <ClipInteractIconSave clip={clip}/>
        <Icon as={BiShare} boxSize={6}/>
      </HStack>
    </Stack>
  )
}

export default ClipInteractIcons