import List from '@/entities/List'
import { Card, CardBody, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { CgMoreVertical } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ExpressionListCardCover from './ExpressionListCardCover'
import ExpressionListCardHeader from './ExpressionListCardHeader'
import ExprressionListCardModal from './ExprressionListCardModal'

interface Props {
  list: List
  onUpdate: (title: string) => void
  onDelete: () => void
}
const ExpressionListCard = ({ list, onUpdate, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card 
      bg='gray.800' 
      overflow='hidden' 
      variant='unstyled' 
      borderRadius={8}
    >
      <ExpressionListCardCover list={list}/>
      <CardBody p='4px'>
        <HStack justifyContent='space-between'>
          <ExpressionListCardHeader list={list}/>
          <Menu>
            <MenuButton  
              as={IconButton}
              aria-label='Options'
              icon={<CgMoreVertical />}
              variant='ghost'
              size='md'
            />
            <MenuList>
              <MenuItem icon={<RiDeleteBin6Line/>} onClick={onDelete}>
                Delete
              </MenuItem>
              <MenuItem icon={<FaRegEdit/>} onClick={onOpen}>
                Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <ExprressionListCardModal 
          list={list} 
          isOpen={isOpen} 
          onClose={onClose} 
          onUpdate={onUpdate}
        />
      </CardBody>
    </Card>
  )
}

export default ExpressionListCard