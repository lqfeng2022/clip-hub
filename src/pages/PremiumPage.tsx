import PageNavTab from '@/components/PageNavTab'
import PremiumCard from '@/components/premium/PremiumCard'
import premiumCard from '@/data/premiumCard'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { Box, Stack } from '@chakra-ui/react'

const BeBroPage = () => {
  const lang = useLanguageStore(s => s.language)

  const header = lang === 'en' 
    ? profilePagesData.en.bro : profilePagesData.zh.bro

  const cards = lang === 'en' ? premiumCard.en : premiumCard.zh

  return (
    <>
      <PageNavTab title={header}/>
      <Box display='flex' justifyContent='center' pb='50px'>
        <Stack>
          {cards.map((card, index)=>
            <PremiumCard 
              key={index} 
              image={card.image}
              credits={card.creidts} 
              price={card.price} 
              step={card.step}
              note={card.note}
            />
          )}
        </Stack>
      </Box>
    </>
  )
}

export default BeBroPage