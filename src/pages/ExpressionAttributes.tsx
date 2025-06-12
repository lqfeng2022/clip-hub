import { Box, Heading, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { ImQuotesLeft } from 'react-icons/im'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import TagHList from '@/components/TagHList'

const ExpressionAttributes = ({ expression } : { expression: Expression }) => {
  return (
    <>
      {/* word */}
      <HStack align='flex-start' wrap='wrap'>
        <Icon as={ImQuotesLeft}/>
        <Heading fontSize='2xl' flex='1'>
          {expression.sentence}
        </Heading>
      </HStack>
      {/* explaining */}
      <Box py={3}>
        <Heading size='md' pb={1} color='gray.500'>
          Explain
        </Heading>
        <Text>{expression.explain}</Text>
      </Box>
      {/* language tags */}
      <Box pb={1}>
        <Heading size='md' color='gray.500'>
          Tags
        </Heading>
        <TagHList tags={expression.langtags} color='teal'/>
      </Box>
      {/* clip link */}
      <Stack>
        <Heading size='md' pb={1} color='gray.500'>
          Related Clip
        </Heading>
        <Link to={`/clips/${expression.video.slug}`}>
          <Box position='relative'>
            <Text
              color='gray.200'
              fontWeight='bold'
              position='absolute'
              left={1}
              top={1}
            >
              {expression.video.title}
            </Text>
            <Image
              w='100%' aspectRatio={ 30 / 9 }
              objectFit='cover'
              src={expression.video.cover}
              className='img-hover'
            />
          </Box>
        </Link>
      </Stack>
    </>
  )
}

export default ExpressionAttributes