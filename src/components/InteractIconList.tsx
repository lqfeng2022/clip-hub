import { Avatar, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { AiFillLike } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import Clip from '../entities/Clip';

interface Props {
  clip: Clip;
}

const InteractIconList = ({ clip }: Props) => {
  const interacts = ['like', 'view', 'bookmark', 'share'];

  const iconMap: { [key: string]: IconType } = {
    like: AiFillLike,
    view: FaRegEye,
    bookmark: FaBookmark,
    share: FaShare,
  };

  return (
    <HStack justifyContent='space-between' margin='12px 4px'>
      <HStack>
        <Avatar size='sm' src={clip.genre.image}/>
        <Text as='b'>{clip.genre.title}</Text>
      </HStack>
      <HStack gap={12} justifyContent='space-between'>
        {interacts.map((interact) => (
          <Icon
            as={iconMap[interact]}
            color='gray.500'
            boxSize={5}
          />
        ))}
      </HStack>
    </HStack>
  );

}

export default InteractIconList