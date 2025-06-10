import { Image, CardBody, Heading, Text, HStack, Avatar, Box, Card } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Clip from '../../entities/Clip'

const ClipCard = ({ clip }: { clip: Clip }) => {
  return (
    <Card bg='gray.800' borderRadius={10} overflow='hidden' variant='unstyled'>
      <Image src={clip.cover} className='img-hover' />
      <CardBody p='12px 4px'>
        <HStack align='flex-start' wrap='wrap' spacing={4}>
          <Avatar
            size='md'
            src={clip.genre.image}
            alignSelf='flex-start'
            flexShrink={0}
          />
          <Box flex='1' minW={0}>
            <Heading fontSize='lg' noOfLines={2} _hover={{color: 'yellow'}}>
              <Link to={'/clips/' + clip.slug}>
                {clip.title}
              </Link>
            </Heading>
            <Text as='b' py={1} fontSize='sm' color='yellow.200'>
              {clip.genre.title}
            </Text>
            <HStack>
              <Text mr={3}>{clip.release_year}</Text>
              <Text as='b' noOfLines={1}>{clip.original}</Text>
            </HStack>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default ClipCard