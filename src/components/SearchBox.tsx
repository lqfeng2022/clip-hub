import { Badge, Box, HStack, ListItem, UnorderedList } from '@chakra-ui/react'
import useSearches from '../hooks/interact/useSearches'
import useSearchPut from '../hooks/interact/useSearchPut'
import { useAuth } from '../AuthContext'

const SearchBox = ({ type }: { type: 'CLIP' | 'WORDS' }) => {
  const { user } = useAuth()
  const { data, refetch, error } = useSearches()
  const { mutate } = useSearchPut()

  const searches = data?.pages[0].results
    .filter((view) => view.visible && view.type === type)
    .slice(0, 9)
  
  const handleUpdate = (search: {id: number}) => {
    if (user) mutate({id: search.id, visible: false }, {
      onSuccess: () => refetch()
    })
  }

  if (!user || error) return null
  return (
    <Box
      position='absolute'
      top='100%' // just below the input
      left={0}
      right={0}
      mt={2}
      p={2}
      zIndex={10}
      h='300px'
      bg='gray.500'
      opacity='0.9'
      borderRadius='md'
      shadow='md'
    >
      <UnorderedList styleType="'- '">
        {searches?.map((search) => 
          <HStack key={search.id} justifyContent='space-between'>
            <ListItem>{search.content}</ListItem>
            <Badge 
              variant='' 
              fontWeight='light' 
              mr={10}
              _hover={{cursor: 'pointer'}}
              onMouseDown={() => handleUpdate(search)}
            >
              remove
            </Badge>
          </HStack>
        )}
      </UnorderedList>
    </Box>
)}

export default SearchBox