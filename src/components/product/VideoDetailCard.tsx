import { VideoProduct } from '@/entities/Product'
import { AspectRatio, Box, Text } from '@chakra-ui/react'
import PostDetailContainer from './PostDetailContainer'
import YouTubeEmbed from './YouTubeEmbed.tsx'

interface Props {
  product: VideoProduct,
  onUnmark?: () => void,
}
const VideoDetailCard = ({ product }: Props) => {
  const content = product.content.title

  const isShort = product.content.kind === 'SHORT'
  const ratio = isShort ? 9/16 : 16/9
  const width = isShort ? '65%' : '100%'

  const youtubeUrl = product.content.website

  return (
    <PostDetailContainer product={product}>
      <Text fontSize='sm' fontWeight='semibold' py={2} color='gray.100'>
        {content}
      </Text>
      <Box overflow='hidden' borderRadius='lg' width={width}>
        {youtubeUrl ? (
          <YouTubeEmbed
            url={youtubeUrl}
            ratio={ratio}
            title={content}
            poster={product.content.cover}
          />
        ) : (
          <AspectRatio ratio={ratio}>
            <video
              src={product.content.file}
              poster={product.content.cover}
              controls
            />
          </AspectRatio>
        )}
      </Box>
    </PostDetailContainer>
  )
}

export default VideoDetailCard