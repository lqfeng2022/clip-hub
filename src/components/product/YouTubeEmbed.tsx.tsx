import { AspectRatio, Box, Image } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  url?: string
  ratio?: number
  title?: string
  poster?: string
}

const getEmbedUrl = (url?: string) => {
  if (!url) return null

  try {
    const parsed = new URL(url)

    let id: string | null = null

    // Standard watch URL
    if (parsed.hostname.includes('youtube.com')) {
      id = parsed.searchParams.get('v')
    }

    // Short youtu.be URL
    if (parsed.hostname.includes('youtu.be')) {
      id = parsed.pathname.replace('/', '')
    }

    // Shorts
    if (parsed.pathname.includes('/shorts/')) {
      id = parsed.pathname.split('/shorts/')[1]
    }

    if (!id) return null

    // Use privacy-enhanced domain
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
  } catch {
    return null
  }
}

const YouTubeEmbed = ({ url, ratio = 16 / 9, title, poster }: Props) => {
  const [play, setPlay] = useState(false)
  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) return null

  return (
    <AspectRatio ratio={ratio} cursor={poster ? 'pointer' : 'default'}>
      {play ? (
        <iframe
          src={`${embedUrl}&autoplay=1`}
          title={title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : poster ? (
        <Box position="relative" onClick={() => setPlay(true)}>
          <Image
            src={poster}
            alt={title}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="md"
          />
          {/* Optional play button overlay */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="60px"
            height="60px"
            bg="rgba(0,0,0,0.6)"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              as="span"
              borderLeft="15px solid white"
              borderTop="10px solid transparent"
              borderBottom="10px solid transparent"
            />
          </Box>
        </Box>
      ) : (
        <iframe
          src={embedUrl}
          title={title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </AspectRatio>
  )
}

export default YouTubeEmbed