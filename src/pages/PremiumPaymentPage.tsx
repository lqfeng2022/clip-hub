import PageNavTab from '@/components/PageNavTab'
import GiftCard from '@/components/premium/GiftCard'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { Box } from '@chakra-ui/react'

const PremiumPaymentPage = () => {
  const language = useLanguageStore((s) => s.language)

  const header = language === 'en' 
    ? profilePagesData.en.payment : profilePagesData.zh.payment
  
  return (
    <>
      <PageNavTab title={header}/>
      <Box display='flex' justifyContent='center' pb='50px'>
        <GiftCard/>
      </Box>
    </>
  )
}

export default PremiumPaymentPage