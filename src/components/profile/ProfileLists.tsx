import useLists from '@/hooks/interact/useLists'
import useLanguageStore from '@/languageStore'
import { Box, Button, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import ExpressionListCardSimple from './ExpressionListCardSimple'
import { Link } from 'react-router-dom'

const ProfileLists = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, error } = useLists()
  const lists = data?.pages[0].results.slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {lang === 'en' ? 'Lists' : '表达式列表'}
        </Heading>
        <Link to='list'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={lists?.length === 0}
          >
            {lang === 'en' ? 'View All' : '查看所有'}
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        p='10px'
        spacing={3}
      >
        {lists?.map((list) => (
          <Box key={list.id}>
            <ExpressionListCardSimple list={list}/>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileLists