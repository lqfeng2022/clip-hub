import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { CiFries } from 'react-icons/ci'
import { GiBrickWall } from 'react-icons/gi'
import { RxLetterCaseCapitalize } from 'react-icons/rx'
import { TbLanguageHiragana } from 'react-icons/tb'
import useExpressionQueryStore from '@/expressionStore'
import useLanguages from '@/hooks/store/useLanguages'
import HScrollContainer from '../HScrollContainer'

const LanguageHList = () => {
  const { data, error } = useLanguages()

  const selectedLangId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const setSelectLangId = useExpressionQueryStore(
    (s) => s.setLanguageId
  )

  const iconMap: { [key: string]: IconType } = {
    english: RxLetterCaseCapitalize,
    japanese: TbLanguageHiragana,
    french: CiFries,
    chinese: GiBrickWall,
  }
  
  if (error) return null
  return (
    <HScrollContainer width='90vw'>
      {data?.results.map((lang) =>
        <Tag
          size='md'
          variant='subtle'
          colorScheme='blue'
          flexShrink={0} // Keeps tags from shrinking
          className='tag-hover'
          key={lang.title}
          onClick={() => setSelectLangId(lang.id)}
        >
          <TagLeftIcon 
            as={iconMap[lang.slug]}
            boxSize={lang.slug === 'chinese' ? '15px' : '20px'} 
          />
          <TagLabel 
          fontWeight={ lang.id === selectedLangId ? 'bold' : 'normal' }
          >
            {lang.title}
          </TagLabel>
        </Tag> 
      )}
    </HScrollContainer>
  )
}

export default LanguageHList