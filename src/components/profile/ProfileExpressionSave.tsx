import { Box, Button, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useEpbooks from '@/hooks/interact/useEpbooks'
import EmptyCard from '../EmptyCard'
import ExpressionCardSimple from '../expression/ExpressionCardSimple'

const ProfileExpressionSave = () => {
  const { data, error } = useEpbooks()
  const epbooks = data?.pages[0].results
    .filter((epbook) => epbook.visible)
    .slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          Expressions
        </Heading>
        <Link to='expression'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={epbooks?.length === 0}
          >
            View All
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        py='10px'
        spacing={3}
      >
        {epbooks?.length === 0 && <EmptyCard/>}
        {epbooks?.map((epbook) => (
          <ExpressionCardSimple 
            expression={epbook.expression} 
            key={epbook.expression.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileExpressionSave