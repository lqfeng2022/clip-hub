import homepageData from '@/data/homepageData'
import useLanguageStore from '@/stores/languageStore'
import heroImage from '@/assets/profile-back.webp'
import { Box, Button, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { useAuth } from '@/AuthContext'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { user } = useAuth()
  
  const lang = useLanguageStore(s => s.language)
  const lang_en = lang === 'en'
  const hero = lang_en ? homepageData.en.hero : homepageData.zh.hero
  const title_lines = hero.title.split('\n')
  const explore = lang_en ? 'Explore' : '搜索'
  const signin = lang_en ? 'Sign in' : '登陆'

  return (
    <SimpleGrid gap={6}>
      <Box py={5}>
        {title_lines.map((line, index) =>
          <Heading 
            key={index}
            fontSize='4xl'
            maxW={{base: '350px', lg: '450px'}}
            lineHeight='1.2' 
            color='gray.100'
          >
            {line}
          </Heading>
        )}
        <Text py={6} color='gray.200'>
          {hero.content}
        </Text>
        <Link to={user ? '/search' : '/user/signin'}>
          <Button
            rightIcon={<FaArrowRight />}
            size='md'
            borderRadius='full'
            color='black'
            bg='green.100'
            p='23px'
            _hover={{bg: 'green.200'}}
          >
            {user ? explore : signin}
          </Button>
        </Link>
      </Box>
      <Box overflow='hidden'>
        <Image src={heroImage} objectFit='cover' borderRadius='lg'/>
      </Box>
    </SimpleGrid>
  )
}

export default Hero