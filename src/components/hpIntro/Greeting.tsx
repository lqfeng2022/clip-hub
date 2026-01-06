import simonintroposter from '@/assets/mosh-intro-poster.avif'
import homepageData from '@/data/homepageData'
import useLanguageStore from '@/stores/languageStore'
import { AspectRatio, Box, Center, Heading, Text, Image } from '@chakra-ui/react'

const Greeting = () => {
  const lang = useLanguageStore(s => s.language)
  const greeting = lang === 'en' 
    ? homepageData.en.greeting : homepageData.zh.greeting

  return (
    <Center>
      <Box py={20} maxW='800px'>
        <Text textAlign='center' fontStyle='italic' color='yellow'>
          Hello,
        </Text>
        <Heading textAlign='center' pb={8}>
          {greeting.title}
        </Heading>
        <Text textAlign='center' fontWeight='light'>
          {greeting.content}
        </Text>
        <Box py={7}>
          <AspectRatio ratio={16/9}>
            <Image src={simonintroposter} />
          </AspectRatio>
        </Box>
        <Text fontWeight='light' textAlign='right'>
          {greeting.foot}
        </Text>
      </Box>
    </Center>
  )
}

export default Greeting