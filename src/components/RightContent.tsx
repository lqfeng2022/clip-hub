import { Box, Divider } from '@chakra-ui/react'
import { useMatch } from 'react-router-dom'
import HpIntro from './hpIntro/HpIntro'
import SearchInput from './search/SearchInput'

const RightContent = () => {
  const match = useMatch('/search')
  const isSearchPage = !!match

  return (
    <>
      { !isSearchPage && <SearchInput/>}
      <Box position='relative' py={1}>
        <Divider borderColor='gray.600'/>
      </Box>
      <HpIntro/>
    </>
  )
}

export default RightContent