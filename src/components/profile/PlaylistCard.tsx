import {
  Card, CardBody, Heading, HStack, IconButton, Image,
  Menu, MenuButton, MenuItem, MenuList, useDisclosure
} from '@chakra-ui/react'
import { CgMoreVertical } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import nocontent from '../../assets/no-content.png'
import List from '../../entities/List'
import PlaylistCardModal from './PlaylistCardModal'

interface Props {
  list: List
  onUpdate: (title: string) => void
  onDelete: () => void
}
const PlaylistCard = ({ list, onUpdate, onDelete }: Props) => {
  const cover = list.items[0]?.video.cover
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/playlist/${list.slug}`

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card bg='gray.800' overflow='hidden' variant='unstyled'>
      {hasItems ? (
        <Link to={contentLink}>
          <Image 
            aspectRatio={16/9}
            src={cover ?? nocontent}
            objectFit='cover' 
            className='img-hover' 
          />
        </Link>
      ) : (
        <Image 
          aspectRatio={16/9} 
          src={nocontent} 
          opacity={0.5} 
          objectFit='cover'
        />
      )}
      <CardBody p='4px'>
        <HStack justifyContent='space-between'>
          {hasItems ? (
            <Link to={contentLink}>
              <Heading
                fontSize='md'
                noOfLines={2}
                _hover={{ color: 'yellow.500' }}
              >
                {list.title}
              </Heading>
            </Link>
          ) : (
            <Heading fontSize='md' noOfLines={2}>
              {list.title}
            </Heading>
          )}
          <Menu>
            <MenuButton  
            as={IconButton}
            aria-label='Options'
            icon={<CgMoreVertical />}
            variant='ghost'
            size='sm'
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
        <PlaylistCardModal 
          list={list} 
          isOpen={isOpen} 
          onClose={onClose} 
          onUpdate={onUpdate}
        />
      </CardBody>
    </Card>
  )
}

export default PlaylistCard