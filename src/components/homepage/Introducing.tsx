import aitutor from '@/assets/ai-tutor.jpg'
import speakconfidently from '@/assets/path-to-speak-confidently.jpg'
import personalizing from '@/assets/personalize-learning-ai.jpg'
import pronunciation from '@/assets/pronunciation-feedback-ai.jpg'
import realwordsources from '@/assets/real-word-sources.jpg'
import voicechat from '@/assets/voice-chat-with-ai.png'
import homepageData from '@/data/homepageData'
import useLanguageStore from '@/languageStore'
import { Box, Center, Heading, Icon, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaPerson } from 'react-icons/fa6'
import { GiStonePath } from 'react-icons/gi'
import { IoIosChatbubbles } from 'react-icons/io'
import { MdKeyboardVoice } from 'react-icons/md'
import { RiOpenSourceFill, RiRobot2Fill } from 'react-icons/ri'
import MotionBox from './MotionBox'

const Introducing = () => {
  const lang = useLanguageStore(s => s.language)

  const reasons = lang === 'en' ? homepageData.en.introduce : homepageData.zh.introduce
  const textwieght = lang === 'en' ? 'bold' : ''

  const iconMap: { [key: string]: IconType } = {
    path: GiStonePath,
    source: RiOpenSourceFill,
    aitutor: RiRobot2Fill,
    voicechat: IoIosChatbubbles,
    pronunciation: MdKeyboardVoice,
    personalizing: FaPerson,
  }

  const imageMap: { [key: string]: string} = {
    path: speakconfidently,
    source: realwordsources,
    aitutor: aitutor,
    voicechat: voicechat,
    pronunciation: pronunciation,
    personalizing: personalizing,
  }

  return (
    <Center>
      <Box py={10} maxW='1000px' borderTop='1px' borderColor='gray.500'>
        <Box py={10}>
          <Center>
            <Text
              pb={3}
              as='i'
              color='green.300'
            >
              {reasons.title}
            </Text>
          </Center>
          <Heading fontSize='2xl' textAlign='center' color='gray.200'>
            {reasons.content}
          </Heading>
        </Box>
        {reasons.lists.map((list, i) =>
          <SimpleGrid
            key={list.title}
            columns={{ sm: 1, lg: 2 }}
            py='40px'
            spacing={8}
          >
            <MotionBox 
              order={{ base: 2, lg: i % 2 === 0 ? 1 : 2 }} // swap on even/odd rows
              animation={i % 2 === 0 ? 'fade-up' : 'fade-down' }
            >
              <Icon
                as={iconMap[list.title]}
                color='green.300'
                boxSize={10}
                bg='rgba(89,91,94,0.3)'
                borderRadius='full'
                p={1.5}
              />
              <Heading pt={2} pb={5}>
                {list.header}
              </Heading>
              <Text fontWeight={textwieght} color='gray.200'>
                {list.content}
              </Text>
            </MotionBox>
            <MotionBox 
              borderRadius='lg' 
              overflow='hidden'
              order={{ base: 2, lg: i % 2 === 0 ? 2 : 1 }} // opposite of the text box
              animation={i % 2 === 0 ? 'fade-down' : 'fade-up' }
            >
              <Image 
                src={imageMap[list.title]} 
                objectFit='cover'
                opacity='0.8'
              />
            </MotionBox>
          </SimpleGrid>
        )}
      </Box>
    </Center>
  )
}

export default Introducing