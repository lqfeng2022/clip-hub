import AllPosts from '@/components/product/AllPosts'
import SearchInput from '@/components/search/SearchInput'
import SearchTabs from '@/components/search/SearchTabs'
import useProductFilterStore from '@/stores/productFilterStore'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'

const SearchPage = () => {
  const setHostId = useProductFilterStore(s => s.setHostId)
  const setSearchTab = useProductFilterStore(s => s.setSearchTab)

  // Reset host filter when entering Search page
  useEffect(() => {
    setHostId(null)           // clear host filter
    setSearchTab('Latest')   // optional: reset UI tab
  }, [])

  return (
    <Box py={2}>
      <Box
        position='sticky'
        top='0px' // height of top navbar
        zIndex={10}
        bg='gray.800'
        opacity='0.99'
      >
        <SearchInput/>
        <SearchTabs/>
      </Box>
      <AllPosts/>
    </Box>
  )
}

export default SearchPage