import simonintroposter from '@/assets/mosh-intro-poster.avif'
import simonintro from '@/assets/mosh-intro.mp4'
import homepageData from '@/data/homepageData'
import useLanguageStore from '@/languageStore'
import { AspectRatio, Box, Center, Heading, Text } from '@chakra-ui/react'

const Greeting = () => {
  const lang = useLanguageStore(s => s.language)
  const greeting = lang === 'en' 
    ? homepageData.en.greeting : homepageData.zh.greeting

  return (
    <Center>
      <Box py={20} maxW='800px'>
        <Text textAlign='center' fontStyle='italic' color='yellow'>
          <strong>Hello</strong>,
        </Text>
        <Heading textAlign='center' pb={8}>
          {greeting.title}
        </Heading>
        <Text
          fontSize='lg' 
          fontWeight='bold' 
          color='gray.200' 
          textAlign='center'
        >
          {greeting.content}
        </Text>
        <Box py={8}>
          <AspectRatio ratio={16/9}>
            <video
              src={simonintro}
              poster={simonintroposter}
              controls
            />
          </AspectRatio>
        </Box>
        <Text 
          fontWeight='bold' 
          color='gray.100' 
          textAlign='right'
        >
          {greeting.foot}
        </Text>
      </Box>
    </Center>
  )
}

export default Greeting