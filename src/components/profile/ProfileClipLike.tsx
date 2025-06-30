import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useClipLikes from '@/hooks/interact/useClipLikes'
import EmptyCard from '../EmptyCard'
import ClipCardSimple from './ClipCardSimple'
import useLanguageStore from '@/languageStore'

const ProfileClipLike = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, error } = useClipLikes()
  const likes = data?.pages[0].results
    .filter((view) => view.visible)
    .slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {lang === 'en' ? 'Liked clips' : '喜欢的视频'}
        </Heading>
        <Link to='like'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={likes?.length === 0}
          >
            {lang === 'en' ? 'View All' : '查看所有'}
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {likes?.length === 0 && <EmptyCard/>}
        {likes?.map((like) => (
            <Box key={like.id} >
              <ClipCardSimple clip={like.video} />
            </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileClipLike