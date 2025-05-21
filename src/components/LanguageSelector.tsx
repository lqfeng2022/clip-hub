import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import useLanguages from '../hooks/useLanguages';
import { Language } from '../hooks/useLanguages'

interface Props {
  onSelectLanguage: (language: Language) => void;
  selectedLanguageId: number;
}

const LanguageSelector = (
  {onSelectLanguage, selectedLanguageId}: Props
) => {
  const {data, error} = useLanguages();
  const selectedLanguage = data?.results.find(
    (p) => p.id == selectedLanguageId
  );

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedLanguage?.title || 'Language'}
      </MenuButton>
      <MenuList>
        {data?.results.map((language) => (
          <MenuItem 
            key={language.id}
            onClick={() => onSelectLanguage(language)}
          >
            {language.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;