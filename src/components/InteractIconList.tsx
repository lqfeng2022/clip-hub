import { Avatar, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { FaRegComment, FaShare } from 'react-icons/fa';
import { IoIosBookmark, IoIosHeart } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import Clip from '../entities/Clip';

interface Props {
  clip: Clip;
}
const InteractIconList = ({ clip }: Props) => {
  const pinkColor = clip.like_state ? 'pink.300' : '';
  const greenColor = clip.bookmark_state ? 'green.300' : '';

  return (
    <Stack spacing={4} m='12px 10px'>
      <HStack justifyContent='space-between'>
        <Icon as={FaRegComment} boxSize={6} color='gray'/>
        <HStack>
          <Icon as={IoIosHeart} boxSize={6} color={pinkColor}/>
          <Text>{clip.likes}</Text>
        </HStack>
        <HStack>
          <Icon as={IoEyeOutline} boxSize={6}/>
          <Text>{clip.views}</Text>
        </HStack>
        <Icon as={IoIosBookmark} boxSize={6} color={greenColor}/>
        <Icon as={FaShare} boxSize={6}/>
      </HStack>
      <HStack spacing={3}>
        <Avatar boxSize='40px' src={clip.genre.image}/>
        <Text as='abbr' fontSize='lg'>{clip.genre.title}</Text>
      </HStack>
    </Stack>
  );
}

export default InteractIconList