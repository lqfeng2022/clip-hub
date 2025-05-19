import { Clip } from '../hooks/useClips';
import { Card, Image, CardBody, Heading, Text, HStack, Avatar, Box, Flex } from '@chakra-ui/react';

interface Props {
  clip: Clip;
}

const GameCard = ({ clip }: Props) => {
  return (
    <Card borderRadius={10} overflow='hidden' bg='gray.800'>
      <Image src={clip.cover} />
      <CardBody padding={4}>
        <Flex direction='column' gap={4}>
          <HStack>
            <Avatar
              name='Segun Adebayo'
              src='https://bit.ly/sage-adebayo'
              alignSelf='flex-start'
            />
          <Box>
            <Heading fontSize='2xl'>{clip.title}</Heading>
            <Text>{clip.genre.title}</Text>
            <HStack>
            {clip.tags.map((tag) => (
              <Text key={tag.id}>{tag.title}</Text>))}
            </HStack>
          </Box>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;