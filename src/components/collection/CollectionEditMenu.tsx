import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { CgMoreVerticalAlt } from 'react-icons/cg'
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
          icon={<CgMoreVerticalAlt />}
          variant='ghost'
          size='sm'
          borderRadius='full'
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
          _expanded={{ bg: 'transparent' }}
        />
        <MenuList 
          py={0}
          borderRadius='lg'
          overflow='hidden'
        >
          <MenuItem 
            fontSize='lg' 
            onClick={onDelete} 
            py={2}
          >
            <Icon as={AiFillDelete} mr={3}/>
            <Text fontWeight='semibold' fontSize='sm'>
              Delete
            </Text>
          </MenuItem>
          <MenuItem 
            fontSize='lg' 
            onClick={onOpen} 
            py={2}
          >
            <Icon as={FaRegEdit} mr={3}/>
            <Text fontWeight='semibold' fontSize='sm'>
              Edit
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
  )
}

export default CollectionEditMenu