import { Box, Image, GridItem, Heading, HStack, Icon, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import useExpression from '../hooks/useExpression'
import { ImQuotesLeft } from 'react-icons/im'
import ExpressionBookmark from '../components/ExpressionBookmark'

const ExpressionDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: exp, isLoading, error } = useExpression(slug!)

  if (isLoading) return <Spinner/>
  if (error || !exp) throw error 
  return (
    <SimpleGrid
      p='15px 10px' 
      columns={{ base: 1, lg: 2 }} 
      spacing={5}
      >
        {/* the left section */}
        <GridItem>
          <Heading pb={3} fontSize='5xl'>{exp.title}</Heading>
          {/* original word */}
          <HStack align='flex-start' wrap='wrap'>
            <Icon as={ImQuotesLeft}/>
            <Heading fontSize='2xl' flex='1'>
              {exp.word}
            </Heading>
          </HStack>
          {/* original clip link */}
          <HStack justifyContent='end' pt={3}>
            <Link to={`/clips/${exp.video}`}>
              <Text
                fontWeight='bold'
                _hover={{ color: 'yellow', cursor: 'pointer' }}
              >
                {`-- Original Video`}
              </Text>
            </Link>
          </HStack>
          {/* expression explaining */}
          <Box py={3}>
            <Heading size='md' pb={1} color='gray.500'>
              Explain
            </Heading>
            <Text>{exp.explain}</Text>
          </Box>
        </GridItem>
        {/* the right section */}
        <GridItem>
          <Box position='relative'>
            <Image
              w='100%'
              objectFit='cover'
              src={exp.image}
            />
            <ExpressionBookmark expression={exp} />
          </Box>
        </GridItem>
    </SimpleGrid>
  )
}

export default ExpressionDetailPage