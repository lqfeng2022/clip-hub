import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import useClips from '../../hooks/useClips'
import ClipCardContainer from '../ClipCardContainer'
import ClipCardSkeleton from '../ClipCardSkeleton'
import SimpleClipCard from '../SimpleClipCard'

const ProfileHistory = () => {
  const { data, error, isLoading } = useClips()
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          History
        </Heading>
        <Button colorScheme='gray' size='sm' variant='outline'>
          View All
        </Button>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {isLoading &&
          skeletons.map(
            (skeleton) => (
              <ClipCardContainer key={skeleton}>
                <ClipCardSkeleton/>
              </ClipCardContainer>
        ))}
          {data?.pages[0].results.map((clip) => (
              <ClipCardContainer key={clip.id} >
                <SimpleClipCard clip={clip} />
              </ClipCardContainer>
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileHistory