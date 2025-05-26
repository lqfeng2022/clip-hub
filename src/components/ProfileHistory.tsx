import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import useClips from '../hooks/useClips'
import CardContainer from './CardContainer'
import ClipCard from './ClipCard'
import ClipCardSkeleton from './ClipCardSkeleton'

const ProfileHistory = () => {
  const { data, error, isLoading } = useClips()
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={3}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          History
        </Heading>
        <Button colorScheme='gray' size='sm' variant='outline'>
          View All
        </Button>
      </HStack>
      <SimpleGrid
        columns={{ sm: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {isLoading &&
          skeletons.map(
            (skeleton) => (
              <CardContainer key={skeleton}>
                <ClipCardSkeleton/>
              </CardContainer>
        ))}
          {data?.pages[0].results.map((clip) => (
              <CardContainer key={clip.id} >
                <ClipCard clip={clip} />
              </CardContainer>
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileHistory