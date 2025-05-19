import { IconType } from 'react-icons';
import { HStack, Icon } from '@chakra-ui/react';
import { Genre } from '../hooks/useClips';
import { IoIosTv } from 'react-icons/io';
import { MdLocalMovies } from 'react-icons/md';
import { GiPig } from 'react-icons/gi';


interface Props {
  genres: Genre[];
}

const PlatformIconList = ({ genres }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    drama: IoIosTv,
    movie: MdLocalMovies,
    animation: GiPig,
  };

  return (
    <HStack marginY={1}>
      {genres.map((genre) => (
        <Icon as={iconMap[genre.slug]} color='gray.500' />
      ))}
    </HStack>
  );
};

export default PlatformIconList;