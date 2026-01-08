import PremiumCard from '@/components/premium/PremiumCard'
import PageNavTab from '@/components/PageNavTab'
import { Box, Stack } from '@chakra-ui/react'

const BeBroPage = () => {
   const cards = [
    { creidts: "1,000", price: "3.00", step: "beginner", note: "Here you can talk with professional tutors boosted by the most advanced AI"},
    { creidts: "5,000", price: "13.00", step: "beginner+", note: "she could be a Language teacher, English, Japanese, French, Chinese.."},
    { creidts: "10,000", price: "25.00", step: "intermedia", note: "Maybe he is a senior engineer, you can ask any question on any topic we provided or just free topic.."},
    { creidts: "50,000", price: "120.00", step: "intermedia+", note: "And, she is also will be a famous nutration professor, you'll keep fit and healty under his suggestion"},
    { creidts: "100,000", price: "220.00", step: "advanced", note: "And if you want, you can talk with an old friend or family who you haven't met for a long time" },
    { creidts: "500,000", price: "1,050.00", step: "advanced+", note: "A girlfriend, a boyfriend, or just a friend, or.." },
    { creidts: "1,000,000", price: "2,000.00", step: "proficiency", note: "Do you wanna talk with an AI who is emotional, feelingful, thinkingful and even can drame, mediate.." },
  ]

  return (
    <>
      <PageNavTab title='Premium'/>
      <Box display='flex' justifyContent='center' pb='50px'>
        <Stack>
          {cards.map((card, index)=>
            <PremiumCard 
              key={index} 
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