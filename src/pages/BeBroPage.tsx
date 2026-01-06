import PremiumCard from '@/components/premium/PremiumCard'
import PageNavTab from '@/components/PageNavTab'
import { Box } from '@chakra-ui/react'

const BeBroPage = () => {
  return (
    <>
      <PageNavTab title='BeBro'/>
      <Box display='flex' justifyContent='center'>
        <PremiumCard/>
      </Box>
    </>
  )
}

export default BeBroPage