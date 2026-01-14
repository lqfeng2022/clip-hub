import { Box, Divider, HStack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useProduct from '../hooks/store/useProduct'
import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import RelevantPosts from '@/components/product/RelevantPosts'
import ExpressionDetailCard from '@/components/product/ExpressionDetailCard'
import SubtitleDetailCard from '@/components/product/SubtitleDetailCard'
import VideoDetailCard from '@/components/product/VideoDetailCard'
import PostMenu from '@/components/product/PostMenu'

const PostDetailPage = () => {
  const { id } = useParams() // get `slug` from url
  const { data: prod, isLoading, error } = useProduct(id!)
  
  if (!id) return <Text>No id found</Text>
  if (isLoading) return <BeatLoader/>
  if (error || !prod) throw error 

  return (
    <>
      <HStack 
        position='sticky'
        pr={2}
        top={0}
        zIndex={10}
        bg='#262626'
        justifyContent='space-between' 
        borderBottom='1px'
        borderColor='gray.700'
      >
        <PageNavTab title='Post'/>
        <PostMenu product={prod}/>
      </HStack>
      <Box maxW='650px'>
        {prod.type === 'expression' && 
          <ExpressionDetailCard product={prod}/>}
        {prod.type === 'subtitle' && 
          <SubtitleDetailCard product={prod}/>}
        {prod.type === 'video' && 
          <VideoDetailCard product={prod}/>}
        <Divider/>
        <RelevantPosts/>
      </Box>
    </>
)
}

export default PostDetailPage