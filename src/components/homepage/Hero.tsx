import homepageData from '@/data/homepageData'
import useLanguageStore from '@/languageStore'
import heroImage from '@/assets/profile-back.webp'
import { Box, Button, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { useAuth } from '@/AuthContext'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { user } = useAuth()
  const lang = useLanguageStore(s => s.language)
  const hero = lang === 'en' ? homepageData.en.hero : homepageData.zh.hero

  return (
  <SimpleGrid 
    columns={{sm: 1, lg: 2}}
    gap={6}
    my={5}
  >
    <Box py={5}>
      <Heading 
        fontSize={{base: '4xl', lg: '5xl'}} 
        maxW={{base: '350px', lg: '450px'}}
        lineHeight='1.2' 
        color='gray.100'
      >
        {hero.title}
      </Heading>
      <Text py={6} fontSize='xl' fontWeight='bold' color='gray.200'>
        {hero.content}
      </Text>
      {user ? (<Link to='/expressions'>
        <Button
          rightIcon={<FaArrowRight />}
          colorScheme='green'
          borderRadius='full'
          size={{base: 'md', lg: 'lg'}}
        >
          Browser Expressions
        </Button>
      </Link>
      ) : (<Link to='/user/singn'>
        <Button
          rightIcon={<FaArrowRight />}
          colorScheme='green'
          borderRadius='full'
          size={{base: 'md', lg: 'lg'}}
        >
          Sign Up for Free
        </Button>
      </Link>
      )}
    </Box>
    <Box overflow='hidden'>
      <Image src={heroImage} objectFit='cover' borderRadius='lg'/>
    </Box>
  </SimpleGrid>
  )
}

export default Hero