import { Button, Collapse, Box } from '@chakra-ui/react'
import { ReactNode, useLayoutEffect, useRef, useState } from 'react'

interface ShowMoreProps {
  children: ReactNode
  startingHeight?: number
}

const ShowMore = ({ children, startingHeight = 80 }: ShowMoreProps) => {
  const [show, setShow] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) return

    const fullHeight = contentRef.current.scrollHeight
    setIsOverflowing(fullHeight > startingHeight)
  }, [children, startingHeight])

  // Case 1: content is short -> render normally
  if (!isOverflowing) {
    return <Box>{children}</Box>
  }

  // Case 2: content overflows -> enable Collapse
  return (
    <>
      <Collapse startingHeight={startingHeight} in={show}>
        <Box ref={contentRef}>
          {children}
        </Box>
      </Collapse>
      <Button
        size='sm'
        mt='0.3rem'
        p='0px'
        variant='ghost'
        borderRadius='10px'
        color='gray.300'
        _hover={{bg: '', color: 'white'}}
        onClick={() => setShow(!show)}
      >
        Show {show ? 'Less' : 'More'}
      </Button>
    </>
  )
}

export default ShowMore