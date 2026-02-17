import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { CgMoreVertical } from 'react-icons/cg'
import { IoIosAdd } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  onAdd?: () => void,
  onDelete?: () => void,
}
const PlaylistEditMenu = ({ onAdd, onDelete }: Props ) => {
    return (
      <Menu>
        <MenuButton  
          as={IconButton}
          aria-label='Options'
          icon={<CgMoreVertical />}
          variant='ghost'
          size='md'
          borderRadius='full'
        />
        {onAdd && (
          <MenuList 
            py={0}
            borderRadius='xl'
            overflow='hidden'
          >
            <MenuItem 
              fontSize='xl' 
              onClick={onAdd} 
              py={2}
            >
              <Icon as={IoIosAdd} mr={3}/>
              <Text fontWeight='semibold' fontSize='md'>
                Add
              </Text>
            </MenuItem>
          </MenuList>
        )}
        {onDelete && (
          <MenuList 
            py={0}
            borderRadius='xl'
            overflow='hidden'
          >
            <MenuItem 
              fontSize='xl' 
              onClick={onDelete} 
              py={2}
            >
              <Icon as={AiFillDelete} mr={3}/>
              <Text fontWeight='semibold' fontSize='md'>
                Delete
              </Text>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
  )
}

export default PlaylistEditMenu