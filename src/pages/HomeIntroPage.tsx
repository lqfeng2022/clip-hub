import { useAuth } from '@/AuthContext'
import ElevenLabsAgent from '@/components/ElevenLabsAgent'
import Footer from '@/components/hpIntro/Footer'
import Greeting from '@/components/hpIntro/Greeting'
import Hero from '@/components/hpIntro/Hero'
import Introducing from '@/components/hpIntro/Introducing'
import Summary from '@/components/hpIntro/Summary'
import { Box } from '@chakra-ui/react'

function HpIntro() {
  const { user } = useAuth()

  return (
    <Box m='10px 8px'>
      <Hero/>
      <Greeting/>
      <Introducing/>
      <Summary/>
      <Footer/>
      {/* ElevenLabs Agent */}
      {user && <ElevenLabsAgent />}
    </Box>
  )
}

export default HpIntro
