import { Box } from '@chakra-ui/react'

const Gradient = () => {
  return (
    <Box
      h='200px' 
      w='100%' 
      bgGradient={[
        'linear(to-tr, teal.300, yellow.700)',
        'linear(to-t, blue.300, teal.700)',
        'linear(to-b, orange.200, purple.400)',
      ]}
      opacity={0.75}
    />
  )
}

export default Gradient