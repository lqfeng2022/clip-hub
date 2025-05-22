import { Image, CardBody, Heading, Text, HStack, Avatar, Box, Card } from '@chakra-ui/react';
import TagList from './TagList';
import { Link } from 'react-router-dom';
import Clip from '../entities/Clip';

interface Props {
  clip: Clip;
}

const GameCard = ({ clip }: Props) => {
  return (
    <Card bg='gray.800'>
      <Image src={clip.cover} />
      <CardBody p='12px 4px'>
        <HStack>
          <Avatar
            size='sm'
            src={clip.genre.image}
            alignSelf='flex-start'
          />
          <Box>
            <Heading fontSize='md'>
              <Link to={'/clips/' + clip.slug}>
                {clip.title}
              </Link>
            </Heading>
            <Text py={1} fontSize='sm'>{clip.genre.title}</Text>
            <TagList tags={clip.tags}/>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;