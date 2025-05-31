import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  width: string,
  children: ReactNode,
}
const HScrollContainer = ({ width, children }: Props) => {
  return (
    <Box
      gap={4}
      p={2}
      display='flex' // Horizontal layout
      overflowX='auto' // Enables scrolling when content overflows
      width={width} // It should be '100vw' by default
      whiteSpace='nowrap' // Prevents tag wrapping
      scrollBehavior='smooth'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }}}
    >
      {children}
    </Box>
  )
}

export default HScrollContainer