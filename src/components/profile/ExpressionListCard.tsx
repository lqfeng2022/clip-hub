import { Box, Card, CardBody, Heading, HStack, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { CgMoreVertical } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import nocontent from '@/assets/no-content.png'
import List from '@/entities/List'
import ExprressionListCardModal from './ExprressionListCardModal'
import ProfileListCardIcon from './ProfileListCardIcon'

interface Props {
  list: List
  onUpdate: (title: string) => void
  onDelete: () => void
}
const ExpressionListCard = ({ list, onUpdate, onDelete }: Props) => {
  const cover = list.items[0]?.expression.image
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/list/${list.slug}`

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card bg='gray.800' overflow='hidden' variant='unstyled' borderRadius={8}>
      {/* 1)Card Image */}
      {hasItems && (
        <Link to={contentLink}>
          <Box position='relative'>
            <Image
              aspectRatio={16/9}
              src={cover ?? nocontent}
              objectFit='cover'
              className='img-hover'
            />
            <ProfileListCardIcon/>
          </Box>
        </Link>
      )}
      {!hasItems && (
        <Box position='relative'>
          <Image
            aspectRatio={16/9}
            src={nocontent}
            opacity={0.5}
            objectFit='cover'
          />
          <ProfileListCardIcon/>
        </Box>
      )}
      {/* 2)Card body */}
      <CardBody p='4px'>
        <HStack justifyContent='space-between'>
          {/* 2.1)Card Heading */}
          {hasItems && (
            <Link to={contentLink}>
              <Heading
                fontSize='md'
                noOfLines={2}
                _hover={{ color: 'yellow.500' }}
              >
                {list.title}
              </Heading>
            </Link>
            )} 
          {!hasItems && (
            <Heading fontSize='md' noOfLines={2}>
              {list.title}
            </Heading>
          )}
          {/* 2.2)Card Menu of `delete` or `edit` buttons */}
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
        {/* 2.3)Card modal for `edit` button */}
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