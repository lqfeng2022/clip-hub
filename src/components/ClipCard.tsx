import { Clip } from '../hooks/useClips';
import { Image, CardBody, Heading, Text, HStack, Avatar, Box, Card } from '@chakra-ui/react';
import TagList from './TagList';

interface Props {
  clip: Clip;
}

const GameCard = ({ clip }: Props) => {
  return (
    <Card bg='gray.800'>
      <Image src={clip.cover} />
      <CardBody p={4}>
        <HStack>
          <Avatar
            name='Segun Adebayo'
            src='https://bit.ly/sage-adebayo'
            alignSelf='flex-start'
          />
          <Box px={2}>
            <Heading fontSize='2xl'>{clip.title}</Heading>
            <Text paddingBottom={2}>{clip.genre.title}</Text>
            <TagList tags={clip.tags}/>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;