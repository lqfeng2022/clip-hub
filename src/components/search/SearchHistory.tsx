import { Badge, Box, HStack, ListItem, UnorderedList } from '@chakra-ui/react'
import useSearches from '../../hooks/interact-search/useSearches'
import useSearchPut from '../../hooks/interact-search/useSearchPut'
import { useAuth } from '../../AuthContext'

interface Props {
  onSelect?: (value: string) => void
}
const SearchHistory = ({ onSelect }: Props) => {
  const { user } = useAuth()
  const { data, refetch, error } = useSearches()
  const { mutate } = useSearchPut()

  const searches = data?.pages[0].results
    .filter((view) => view.visible)
  
  const handleUpdate = (search: {id: number}) => {
    if (user) mutate({id: search.id, visible: false }, {
      onSuccess: () => refetch()
    })
  }

  if (!user || error) return null
  return (
    <Box
      flex='1'
      overflowY='auto'
      position='absolute'
      top='100%' // just below the input
      left={0}
      right={0}
      mx={4}
      p='10px 15px 15px 10px'
      zIndex={10}
      h='200px'
      bg='gray.500'
      opacity='0.95'
      borderRadius='md'
      shadow='md'
    >
      <UnorderedList styleType="'- '">
        {searches?.map((search) => 
          <HStack key={search.id} justifyContent='space-between'>
            <ListItem
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              onMouseDown={(e) => {
                e.preventDefault()// prevent input blur before click
                onSelect?.(search.content)
              }}
            >
              {search.content}
            </ListItem>
            <Badge 
              variant='' 
              _hover={{cursor: 'pointer', color: 'red.300'}}
              onMouseDown={(e) => {
                e.preventDefault() // prevents blur/outside-click from firing
                handleUpdate(search)
              }}
            >
              delete
            </Badge>
          </HStack>
        )}
      </UnorderedList>
    </Box>
)}

export default SearchHistory