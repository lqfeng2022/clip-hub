import { Checkbox, CheckboxGroup, Stack, Text, Box } from '@chakra-ui/react'
import List from '@/entities/List'

interface Props {
  lists: List[],
  selectedListIds: number[],
  onChange: (ids: number[]) => void
}
const ExpressionListItemAdd = ({ lists, selectedListIds, onChange }: Props) => {
  if (lists.length === 0)
    return <Text>No expression lists yet. Create one to save clips.</Text>
  return (
    <CheckboxGroup 
      colorScheme='green' 
      value={selectedListIds.map(String)} // Chakra needs strings
      // convert back to number[]
      onChange={(selected) => onChange(selected.map(Number))} 
    >
      <Stack spacing={5} flex='1' overflowY='auto'>
        {lists.map((list) =>
          <Checkbox
            size='lg'
            key={list.id}
            value={list.id.toString()}
            ml={3}
            gap={2}
          >
            {list.title}
          </Checkbox>
        )}
      </Stack>
    </CheckboxGroup>
  )
}

export default ExpressionListItemAdd