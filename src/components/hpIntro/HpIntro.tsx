import Footer from '@/components/hpIntro/Footer'
import Greeting from '@/components/hpIntro/Greeting'
import Hero from '@/components/hpIntro/Hero'
import Introducing from '@/components/hpIntro/Introducing'
import Summary from '@/components/hpIntro/Summary'
import { Box } from '@chakra-ui/react'

function HpIntro() {
  return (
    <Box m='10px 8px'>
      <Hero/>
      <Greeting/>
      <Introducing/>
      <Summary/>
      <Footer/>
    </Box>
  )
}

export default HpIntro
