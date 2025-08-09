import { Box, Button, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useExpressionLikes from '@/hooks/interact/useExpressionLikes'
import EmptyCard from '../EmptyCard'
import ExpressionCardSimple from '../expression/ExpressionCardSimple'
import useLanguageStore from '@/languageStore'

const ProfileEplike = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, error } = useExpressionLikes()
  const eplikes = data?.pages[0].results
    .filter((eplike) => eplike.visible)
    .slice(0, 5)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {lang === 'en' ? 'Liked' : '喜欢的表达式'}
        </Heading>
        <Link to='expression'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={eplikes?.length === 0}
          >
            {lang === 'en' ? 'View All' : '查看所有'}
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        py='10px'
        spacing={3}
      >
        {eplikes?.length === 0 && <EmptyCard/>}
        {eplikes?.map((eplike) => (
          <ExpressionCardSimple 
            expression={eplike.expression} 
            key={eplike.expression.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileEplike