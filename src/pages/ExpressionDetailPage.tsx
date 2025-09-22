import ExpressionDetailContent from '@/components/expression/ExpressionDetailContent'
import { Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useClipExpressions from '../hooks/store/useClipExpressions'
import useExpression from '../hooks/store/useExpression'
import BeatLoader from '@/components/BeatLoader'

const ExpressionDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: exp, isLoading, error } = useExpression(slug!)

  const videoId = exp?.video?.id
  const { data: clipexp } = useClipExpressions(videoId)
  
  if (!slug) return <Text>No slug found</Text>
  if (isLoading) return <BeatLoader/>
  if (error || !exp) throw error 
  return (
    <ExpressionDetailContent
      exp={exp}
      // pass `[]` until it's ready, avoid runtime crashes
      clipexp={clipexp?.results ?? []}
    />
)
}

export default ExpressionDetailPage