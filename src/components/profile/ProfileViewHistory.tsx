import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useEpHistories from '@/hooks/interact/useEpHistories'
import EmptyCard from '../EmptyCard'
import useLanguageStore from '@/languageStore'
import ExpressionCardSimple from '../expression/ExpressionCardSimple'

const ProfileViewHistory = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, error } = useEpHistories()
  const views = data?.pages[0].results
    .filter((view) => view.visible)
    .slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {lang === 'en' ? 'History' : '浏览历史'}
        </Heading>
        <Link to='history'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={views?.length === 0}
          >
            {lang === 'en' ? 'View All' : '查看所有'}
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {views?.length === 0 && <EmptyCard/>}
        {views?.map((view) => (
          <ExpressionCardSimple 
            expression={view.expression} 
            key={view.expression.id}/>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileViewHistory