import { Box, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  term: string
  children: ReactNode | ReactNode[]
}
const ClipAttrDefinition = ({ term, children }: Props) => {
  return (
    <Box my={1}>
      <Heading pb={1} fontSize='md' color='gray.500'>
        {term}
      </Heading>
      <Text>{children}</Text>
    </Box>
  )
}

export default ClipAttrDefinition