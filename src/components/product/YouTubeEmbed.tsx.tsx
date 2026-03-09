import { AspectRatio } from '@chakra-ui/react'

interface Props {
  url?: string
  ratio?: number
  title?: string
}

const getEmbedUrl = (url?: string) => {
  if (!url) return null

  try {
    const parsed = new URL(url)

    let id: string | null = null

    if (parsed.hostname.includes('youtube.com')) {
      id = parsed.searchParams.get('v')
    }

    if (parsed.hostname.includes('youtu.be')) {
      id = parsed.pathname.replace('/', '')
    }

    if (!id) return null

    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
  } catch {
    return null
  }
}

const YouTubeEmbed = ({ url, ratio = 16 / 9, title }: Props) => {
  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) return null

  return (
    <AspectRatio ratio={ratio}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </AspectRatio>
  )
}

export default YouTubeEmbed