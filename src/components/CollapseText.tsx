import { Button, Collapse } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  limit: number
  children: string
}
const CollapseText = ({ limit, children }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Collapse startingHeight={limit} in={show}>
        {children}
      </Collapse>
      <Button 
        size='xs' 
        mt='0.5rem'
        colorScheme='gray'
        variant='outline'
        onClick={() => setShow(!show)}
        >
        Show {show ? 'Less' : 'More'}
      </Button>
    </>
  )
}

export default CollapseText