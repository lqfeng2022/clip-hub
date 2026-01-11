import PremiumCard from '@/components/premium/PremiumCard'
import PageNavTab from '@/components/PageNavTab'
import { Box, Stack } from '@chakra-ui/react'
import bro_image from '@/assets/bro.jpg'
import words_art_001 from '@/assets/words-art-001.jpg'
import words_art_002 from '@/assets/words-art-002.jpg'
import words_art_003 from '@/assets/words-art-003.webp'
import words_art_004 from '@/assets/words-art-004.jpg'
import words_art_005 from '@/assets/words-art-005.webp'
import words_art_006 from '@/assets/words-art-006.jpg'

const BeBroPage = () => {
   const cards = [
    { 
      creidts: "1,000", 
      price: "3.00", 
      step: "free", 
      image: bro_image,
      note: "Here, you can talk with professional tutors enhanced by the most advanced AI."
    },
    { 
      creidts: "5,000", 
      price: "13.00", 
      step: "beginner+", 
      image: words_art_001,
      note: "She might be a language teacher — English, Japanese, French, Chinese, and more."},
    { 
      creidts: "10,000", 
      price: "25.00", 
      step: "intermedia", 
      image: words_art_002,
      note: "He could be a senior engineer. You can ask questions on any topic we offer, or simply chat about anything you like."},
    { 
      creidts: "50,000", 
      price: "120.00", 
      step: "intermedia+", 
      image: words_art_003,
      note: "She could also be a renowned nutrition professor, helping you stay fit and healthy with expert guidance."},
    { 
      creidts: "100,000", 
      price: "220.00", 
      step: "advanced", 
      image: words_art_004,
      note: "If you want, you can even talk with an old friend or a family member you haven’t seen in a long time." },
    { 
      creidts: "500,000", 
      price: "1,050.00", 
      step: "advanced+", 
      image: words_art_006,
      note: "A girlfriend, a boyfriend, or just a friend — it’s up to you." },
    { 
      creidts: "1,000,000", 
      price: "2,000.00", 
      step: "proficiency", 
      image: words_art_005,
      note: "Do you want to talk with an AI that has emotions, understands feelings, thinks deeply, and can even role-play, comfort, or mediate?" },
  ]

  return (
    <>
      <PageNavTab title='Premium'/>
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