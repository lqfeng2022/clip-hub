import { SimpleGrid } from '@chakra-ui/react'

function HomePage() {
  return (
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        p='10px'
        spacing={4}
      >
        ...
      </SimpleGrid>
  )
}

export default HomePage
