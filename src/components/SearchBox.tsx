import { Badge, Box, HStack, ListItem, UnorderedList, useToast } from '@chakra-ui/react'
import useSearches from '../hooks/useSearches'
import useSearchPut from '../hooks/useSearchPut'

interface Props {
  type: 'CLIP' | 'WORDS'
}
const SearchBox = ({ type }: Props) => {
  const { data, refetch, error } = useSearches()
  const { mutate } = useSearchPut()
  const toast = useToast()

  if (error) 
    return toast({ 
      title: 'Oops, error happend', status: 'error',  duration: 2000 
    })

  const searches = data?.pages[0].results
    .filter((view) => view.visible && view.type === type)
    .slice(0, 9)
  
  const handleUpdate = (search: {id: number}) => {
    mutate({id: search.id, visible: false }, {
      onSuccess: () => refetch()
    })
  }

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