import { 
  Button, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList 
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useLanguage from '../../hooks/useLanguage'
import useLanguages from '../../hooks/useLanguages'
import useClipQueryStore from '../../clipStore'

const LangSelector = () => {
  const { data, error } = useLanguages()
  const selectedLanguageId = useClipQueryStore((s) => s.clipQuery.languageId)
  const setSelectLanguageId = useClipQueryStore((s) => s.setLanguageId)
  const selectedLanguage = useLanguage(selectedLanguageId)

  if (error) return null
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedLanguage?.title || 'Language'}
      </MenuButton>
      <MenuList>
        {data?.results.map((language) => (
          <MenuItem 
            key={language.id}
            onClick={() => setSelectLanguageId(language.id)}
          >
            {language.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LangSelector