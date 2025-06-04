import { 
  Box, Button, Card, CardBody, HStack, Heading, Image, 
  SimpleGrid, Text 
} from '@chakra-ui/react'
import useEpbooks from '../../hooks/useEpbooks'
import { Link } from 'react-router-dom'

const ProfileEpbook = () => {
  const { data, error } = useEpbooks()
  const epbooks = data?.pages[0].results
    .filter((epbook) => epbook.visible)
    .slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          Saved Expressions
        </Heading>
        <Link to='expression'>
          <Button colorScheme='gray' size='sm' variant='outline'>
            View All
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        p='10px'
        spacing={3}
      >
        {epbooks?.map((epbook) => (
          <Box key={epbook.id}>
            <Card overflow='hidden' variant=''>
              <Image
                w='100%'
                objectFit='cover'
                aspectRatio={ 20 / 9}
                src={epbook.expression.image}
              />
              <CardBody p='5px 8px'>
                <Link to={'/expressions/' + epbook.expression.slug}>
                  <Heading 
                    fontSize='xl' 
                    color='yellow.200'
                    _hover={{ color: 'white' }}
                  >
                    {epbook.expression.title}
                  </Heading>
                </Link>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileEpbook