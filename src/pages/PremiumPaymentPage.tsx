import PageNavTab from '@/components/PageNavTab'
import GiftCard from '@/components/premium/GiftCard'
import { Box } from '@chakra-ui/react'

const PremiumPaymentPage = () => {
  return (
    <>
      <PageNavTab title='Payment'/>
      <Box display='flex' justifyContent='center' pb='50px'>
        <GiftCard/>
      </Box>
    </>
  )
}

export default PremiumPaymentPage