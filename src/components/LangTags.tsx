import { Box, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { RxLetterCaseCapitalize } from 'react-icons/rx'
import { TbLanguageHiragana } from 'react-icons/tb'
import { CiFries } from 'react-icons/ci'
import { GiBrickWall } from 'react-icons/gi'
import useLanguages from '../hooks/useLanguages'
import useExpressionQueryStore from '../expressionStore'
import { IconType } from "react-icons";

const LangTags = () => {
  const { data, error } = useLanguages()
  const selectedLangId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId)
  const setSelectLangId = useExpressionQueryStore(
    (s) => s.setLanguageId)

  const iconMap: { [key: string]: IconType } = {
    english: RxLetterCaseCapitalize,
    japanese: TbLanguageHiragana,
    french: CiFries,
    chinese: GiBrickWall,
  }
  
  if (error) return null
  return (
    <Box
      gap={5}
      p={2}
      display='flex' // Horizontal layout
      overflowX='auto' // Enables scrolling when content overflows
      whiteSpace='nowrap' // Prevents tag wrapping
      scrollBehavior='smooth'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }}}
    >
      {data?.results.map((lang) =>
        <Tag
          size='lg'
          variant='subtle'
          colorScheme='blue'
          flexShrink={0} // Keeps tags from shrinking
          className='tag-hover'
          key={lang.title}
          onClick={() => setSelectLangId(lang.id)}
        >
          <TagLeftIcon 
            as={iconMap[lang.slug]}
            boxSize={lang.slug === 'chinese' ? '20px' : '25px'} 
          />
          <TagLabel fontWeight={
            lang.id === selectedLangId 
            ? 'bold' : 'normal'
            }
          >
            {lang.title}
          </TagLabel>
        </Tag> 
      )}
    </Box>
  )
}

export default LangTags