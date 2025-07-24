import { Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react'
import List from '@/entities/List'

interface Props {
  lists: List[],
  selectedListIds: number[],
  onChange: (ids: number[]) => void
}
const ExpressionPlaylistItemAdd = ({ lists, selectedListIds, onChange }: Props) => {
  if (lists.length === 0)
    return <Text>No playlists yet. Create one to save clips.</Text>
  return (
    <CheckboxGroup 
      colorScheme='green' 
      value={selectedListIds.map(String)} // Chakra needs strings
      // convert back to number[]
      onChange={(selected) => onChange(selected.map(Number))} 
    >
      <Stack spacing={[1, 5]}>
        {lists.map((list) => 
          <Checkbox key={list.id} value={list.id.toString()}>
            {list.title}
          </Checkbox>
        )}
      </Stack>
    </CheckboxGroup>
  )
}

export default ExpressionPlaylistItemAdd