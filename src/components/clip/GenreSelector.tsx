import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useGenres from '@/hooks/store/useGenres'
import useClipQueryStore from '@/clipStore'
import useGenre from '@/hooks/store/useGenre'

const GenreSelector = () => {
  const { data, error } = useGenres()

  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)
  const selectedGenre = useGenre(selectedGenreId)

  if (error) return null
  return (
    <Menu>
      <MenuButton size='sm' as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenre?.title || 'Genre'}
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
            {genre.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default GenreSelector