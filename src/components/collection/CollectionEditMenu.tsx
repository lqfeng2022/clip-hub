import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { CgMoreVertical } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  onDelete: () => void
  onOpen: () => void
}
const CollectionEditMenu = ({ onDelete, onOpen }: Props ) => {
    return (
      <Menu>
        <MenuButton  
          as={IconButton}
          aria-label='Options'
          icon={<CgMoreVertical />}
          variant='ghost'
          size='lg'
          borderRadius='full'
        />
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
          <MenuItem 
            fontSize='xl' 
            onClick={onOpen} 
            py={2}
          >
            <Icon as={FaRegEdit} mr={3}/>
            <Text fontWeight='semibold' fontSize='md'>
              Edit
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
  )
}

export default CollectionEditMenu