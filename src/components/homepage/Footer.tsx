import { Center, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import homepageData from '@/data/homepageData'
import useLanguageStore from '@/languageStore'

const Footer = () => {
  const lang = useLanguageStore(s => s.language)
  const footer = lang === 'en' 
    ? homepageData.en.footer : homepageData.zh.footer

  const mediaList = [
    { name: FaYoutube },
    { name: FaTiktok },
    { name: FaXTwitter },
    { name: FaInstagram },
    { name: FaFacebook },
  ]

  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

  return (
    <Center py={14} borderTop='1px' borderColor='gray.500'>
      <SimpleGrid 
        columns={{base: 1, lg: 4}}
        spacing={5}
        w='100%'
      >
        <Center>
          <Link to='/' onClick={scrollToTop}>
            <Text color='gray.300' fontSize='lg'>
              &copy; <strong>{footer.title}</strong> 2025
            </Text>
          </Link>
        </Center>
        <Center>
          <Text color='gray.100'>
            {footer.design} <strong>{footer.author}</strong>
          </Text>
        </Center>
        <Center>
          <HStack gap={5}>
            {mediaList.map((list, i) => 
              <Icon key={i} as={list.name} boxSize={6} color='gray.300'/>
            )}
          </HStack>
        </Center>
        <Center>
          <HStack gap={3}>
            <Text color='gray.300' fontSize='sm'>
              {footer.terms}
            </Text>
            <Text color='gray.300' fontSize='sm'>
              {footer.privacy}
            </Text>
          </HStack>
        </Center>
      </SimpleGrid>
    </Center>
  )
}

export default Footer