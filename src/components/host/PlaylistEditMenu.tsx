import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { CgMoreVerticalAlt } from 'react-icons/cg'
import { IoIosAdd } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  isSaved: boolean,
  onAdd?: () => void,
  onDelete?: () => void,
}
const PlaylistEditMenu = ({ onAdd, onDelete, isSaved }: Props ) => {
    return (
      <Menu>
        <MenuButton  
          as={IconButton}
          aria-label='Options'
          icon={<CgMoreVerticalAlt />}
          variant='ghost'
          size='sm'
          borderRadius='full'
        />
        <MenuList 
          py={0}
          borderRadius='lg'
          overflow='hidden'
        >
          <MenuItem 
            fontSize='lg' 
            onClick={isSaved ? onDelete : onAdd} 
            py={2}
          >
            <Icon as={isSaved ? AiFillDelete : IoIosAdd} mr={3}/>
            <Text fontWeight='semibold' fontSize='sm'>
              {isSaved ? 'Delete' : 'Add'}
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
  )
}

export default PlaylistEditMenu