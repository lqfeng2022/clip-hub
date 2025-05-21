import { Clip } from '../hooks/useClips';
import { Image, CardBody, Heading, Text, HStack, Avatar, Box, Card } from '@chakra-ui/react';
import TagList from './TagList';
import { Link } from 'react-router-dom';

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
            src={clip.genre.image}
            alignSelf='flex-start'
          />
          <Box px={2}>
            <Heading fontSize='xl'>
              <Link to={'/clips/' + clip.slug}>
                {clip.title}
              </Link>
            </Heading>
            <Text paddingBottom={2}>{clip.genre.title}</Text>
            <TagList tags={clip.tags}/>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;