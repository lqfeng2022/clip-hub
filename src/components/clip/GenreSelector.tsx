import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useGenres from '@/hooks/store/useGenres'
import useClipQueryStore from '@/clipStore'
import useGenre from '@/hooks/store/useGenre'
import useLanguageStore from '@/languageStore'
import { clipPage } from '@/data/clipPage'

const GenreSelector = () => {
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)
  const selectedGenre = useGenre(selectedGenreId)

  const lang = useLanguageStore(s => s.language)
  const title = lang === 'en' 
    ? selectedGenre?.title || clipPage.en.genre
    : selectedGenre?.title_ch || clipPage.zh.genre
  
  const { data, error } = useGenres()
  if (error) return null
  return (
    <Menu>
      <MenuButton size='sm' as={Button} rightIcon={<BsChevronDown />}>
        {title}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setSelectedGenreId(undefined)}>
          All
        </MenuItem>
        {data?.results.map((genre) => (
          <MenuItem 
            key={genre.id}
            onClick={() => setSelectedGenreId(genre.id)}
          >
            {lang === 'en' ? genre.title : genre.title_ch}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default GenreSelector