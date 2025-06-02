import { Box, Button, Collapse } from '@chakra-ui/react'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  limit: number,
  children: ReactNode,
}
const CollapseText = ({ limit, children }: Props) => {
  const [show, setShow] = useState(false)
  const [isExpandable, setExpandable] = useState(false)

  // React renders the DOM
  // `useEffect` runs after that
  // `ref.current.scrollHeight` contains the actual height of the content
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const contentHeight = contentRef.current?.scrollHeight || 0
    if (contentHeight > limit) setExpandable(true)
    }, [children, limit]
  )

  return (
    <>
      <Collapse startingHeight={limit} in={show}>
        <Box ref={contentRef} lineHeight='shorter'>{children}</Box>
      </Collapse>
      {isExpandable && (
        <Button 
          size='xs' 
          mt='0.5rem'
          colorScheme='gray'
          variant='outline'
          onClick={() => setShow(!show)}
          >
          Show {show ? 'Less' : 'More'}
        </Button>
      )}
    </>
  )
}

export default CollapseText