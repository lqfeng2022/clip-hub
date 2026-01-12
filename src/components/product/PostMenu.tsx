import { Product } from '@/entities/Product'
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { FaUserCheck } from 'react-icons/fa6'
import { IoMdHeartDislike } from 'react-icons/io'
import useFollowManager from '@/hooks/useFollowManager'
import { TfiMoreAlt } from 'react-icons/tfi'

interface Props {
  product: Product,
  onUnmark?: () => void,
}
const PostMenu = ({ product }: Props) => {
  const { user, marked, toggleMarked  } = useFollowManager( product.host.id, product.followed)
  const follow_state = marked ? 'Followed @' : 'Follow @'

  return (
    <Menu>
      <MenuButton  
        as={IconButton}
        aria-label='Options'
        icon={<TfiMoreAlt />}
        variant='ghost'
        boxSize={5}
        color='gray.300'
        disabled={!user}
        _hover={{bg: '', borderRadius: '5px'}}
      />
      <MenuList 
        bg='gray.700' 
        onClick={toggleMarked}
        py={0} 
        borderRadius='xl'
        overflow='hidden'
      >
        <MenuItem fontSize='xl' py={2}>
          <Icon 
            as={FaUserCheck} 
            mr={4}
            color={marked ? 'yellow.200' : ''}
          />
          <Text fontWeight='semibold' fontSize='sm'>
            {`${follow_state}${product.host.slug}`}
          </Text>
        </MenuItem>
        <MenuItem fontSize='xl' py={2}>
          <Icon 
            as={IoMdHeartDislike} 
            mr={4}
            color='gray.300'
          />
          <Text fontWeight='semibold' fontSize='sm'>
            Dislike this Post
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default PostMenu