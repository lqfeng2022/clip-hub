import { Checkbox, CheckboxGroup, Stack, Text, Box } from '@chakra-ui/react'
import List from '@/entities/List'

interface Props {
  lists: List[],
  selectedListIds: number[],
  onChange: (ids: number[]) => void
}
const ExpressionListItemAdd = ({ lists, selectedListIds, onChange }: Props) => {
  return (
    <Box flex='1' overflowY='auto' maxH='50vh'>
      {lists.length === 0 && <Text>
          No expression lists yet. Create one to save clips.
        </Text>
      }
      <CheckboxGroup
        colorScheme='green'
        value={selectedListIds.map(String)} // Chakra needs strings
        // convert back to number[]
        onChange={(selected) => onChange(selected.map(Number))}
      >
        <Stack spacing={5} flex='1' overflowY='auto'>
          {lists.map((list) =>
            <Checkbox
              size='md'
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
    </Box>
  )
}

export default ExpressionListItemAdd