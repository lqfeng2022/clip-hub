import { useLocation } from 'react-router-dom'
import useClipQueryStore from '../clipStore'
import useExpressionQueryStore from '../expressionStore'

const useSearchContext = () => {
  const location = useLocation()
  const isExpression = location.pathname.startsWith('/expression')

  const setSearchText = isExpression
    ? useExpressionQueryStore((s) => s.setSearchText)
    : useClipQueryStore((s) => s.setSearchText)

  const placeholder = `Search ${isExpression ? 'expressions' : 'clips'}...`
  const placeholder_ch = `搜索${isExpression ? '英文表达式' : '视频'}...`
  const type: 'CLIP' | 'WORDS' = isExpression ? 'WORDS' : 'CLIP'

  return { isExpression, setSearchText, placeholder, placeholder_ch, type }
}

export default useSearchContext