import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const ClipCardContainer = ({ children }: Props) => {
  return (
    <Box 
      borderRadius={10} 
      overflow='hidden'
      className='img-hover'
    >
      {children}
    </Box>
  )
}

export default ClipCardContainer
