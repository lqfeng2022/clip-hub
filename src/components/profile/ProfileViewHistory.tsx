import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useExpressionViews from '@/hooks/interact/useExpressionViews'
import EmptyCard from '../EmptyCard'
import useLanguageStore from '@/languageStore'
import ExpressionCardSimple from '../expression/ExpressionCardSimple'
import profilePagesData from '@/data/profilePagesData'

const ProfileViewHistory = () => {
  const lang = useLanguageStore(s => s.language)
  const buttons = lang === 'en' ? profilePagesData.en : profilePagesData.zh

  const { data, error } = useExpressionViews()
  const views = data?.pages[0].results
    .filter((view) => view.visible)
    .slice(0, 5)
  
  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {buttons.history}
        </Heading>
        <Link to='history'>
          <Button
            colorScheme='gray'
            size='sm'
            variant='outline'
            disabled={views?.length === 0}
          >
            {buttons.view_all}
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