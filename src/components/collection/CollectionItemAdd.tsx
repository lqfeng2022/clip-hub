import { Checkbox, CheckboxGroup, Stack, Text, Box } from '@chakra-ui/react'
import Collection from '@/entities/Collection'

interface Props {
  lists: Collection[],
  selectedListIds: number[],
  onChange: (ids: number[]) => void
}
const CollectionItemAdd = ({ lists, selectedListIds, onChange }: Props) => {
  return (
    <Box flex='1' overflowY='auto' maxH='50vh'>
      {lists.length === 0 && <Text>
          No lists yet, create one to save posts.
        </Text>
      }
      <CheckboxGroup
        colorScheme='green'
        value={selectedListIds.map(String)} // Chakra needs strings
        // convert back to number[]
        onChange={(selected) => onChange(selected.map(Number))}
      >
        <Stack spacing={4} flex='1' overflowY='auto'>
          {lists.map((list) =>
            <Checkbox
              size='md'
              key={list.id}
              value={list.id.toString()}
              ml={3}
              gap={2}
              fontWeight='semibold'
              color='gray.100'
            >
              {list.title}
            </Checkbox>
          )}
        </Stack>
      </CheckboxGroup>
    </Box>
  )
}

export default CollectionItemAdd