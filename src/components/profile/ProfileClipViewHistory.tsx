import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useClipHistories from '../../hooks/useClipHistories'
import SimpleClipCard from './SimpleClipCard'
import EmptyCard from '../EmptyCard'

const ProfileClipViewHistory = () => {
  const { data, error } = useClipHistories()
  const views = data?.pages[0].results
    .filter((view) => view.visible).slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          History
        </Heading>
        <Link to='history'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={views?.length === 0}
          >
            View All
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {views?.length === 0 && <EmptyCard/>}
        {views?.map((view) => (
            <Box key={view.id} >
              <SimpleClipCard clip={view.video} />
            </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileClipViewHistory