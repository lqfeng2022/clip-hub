import { Clip } from '../hooks/useClips';
import { Card, Image, CardBody, Heading } from '@chakra-ui/react';

interface Props {
  clip: Clip;
}

const GameCard = ({ clip }: Props) => {
  return (
    <Card borderRadius={10} overflow='hidden'>
      <Image src={clip.cover} />
      <CardBody>
        <Heading fontSize='2xl'>{clip.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;