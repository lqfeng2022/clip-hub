import { Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ProfileListCardIcon from './ProfileListCardIcon'
import List from '@/entities/List'
import nocontent from '@/assets/no-content.png'
import { pocketURL } from '@/services/pocket'

const ExpressionListCardCover = ({ list }: { list: List }) => {
  const image = list.items[0]?.expression.image
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/list/${list.slug}`

  return (
    <>
      {hasItems ? (
        <Link to={contentLink}>
          <Box position='relative'>
            <Image
              aspectRatio={16/9}
              src={image ? `${pocketURL}${image}` : nocontent}
              objectFit='cover'
              className='img-hover'
            />
            <ProfileListCardIcon/>
          </Box>
        </Link>
      ) : (
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
    </>
  )
}

export default ExpressionListCardCover