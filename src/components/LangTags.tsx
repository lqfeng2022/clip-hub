import { Box, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { TbLanguageHiragana } from 'react-icons/tb';
import { CiFries } from 'react-icons/ci';
import { GiBrickWall } from "react-icons/gi";

const LangTags = () => {
  const langs = [
    { name: 'English', icon: RxLetterCaseCapitalize, color: 'cyan' },
    { name: '日本語', icon: TbLanguageHiragana, color: 'green' },
    { name: 'Français', icon: CiFries, color: 'yellow' },
    { name: '中文', icon: GiBrickWall, color: 'gray' },
  ]
  
  return (
    <Box 
      gap={5} 
      p={2}
      display='flex' // Horizontal layout
      overflowX='auto' // Enables scrolling when content overflows
      whiteSpace='nowrap' // Prevents tag wrapping
      scrollBehavior='smooth' // Enables smooth scroll interactions
      sx={{ '&::-webkit-scrollbar': {
          display: 'none' // Optional: hide scrollbar
        }
      }}
    >
    {langs.map((lang) => 
      <Tag 
        size='lg' 
        variant='subtle' 
        colorScheme={lang.color} 
        key={lang.name}
        flexShrink={0} // Keeps tags from shrinking
        cursor='pointer'
        className='tag-hover'
      >
        <TagLeftIcon boxSize='25px' as={lang.icon} />
        <TagLabel>{lang.name}</TagLabel>
      </Tag> 
    )}
    </Box>
  )
}

export default LangTags