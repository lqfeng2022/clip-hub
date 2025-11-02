import Footer from '@/components/homepage/Footer'
import Greeting from '@/components/homepage/Greeting'
import Hero from '@/components/homepage/Hero'
import Introducing from '@/components/homepage/Introducing'
import Summary from '@/components/homepage/Summary'
import { Box } from '@chakra-ui/react'

function HomePage() {
  return (
    <Box px={2}>
      <Hero/>
      <Greeting/>
      <Introducing/>
      <Summary/>
      <Footer/>
    </Box>
  )
}

export default HomePage
