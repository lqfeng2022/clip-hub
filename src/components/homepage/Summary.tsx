import homepageData from '@/data/homepageData'
import useLanguageStore from '@/languageStore'
import { Center, Box, Heading, Text, Button, HStack } from '@chakra-ui/react'
import MotionBox from './MotionBox'
import { Link } from 'react-router-dom'
import { useAuth } from '@/AuthContext'

const Summary = () => {
  const { user } = useAuth()

  const lang = useLanguageStore(s => s.language)
  const summary = lang === 'en' ? homepageData.en.summary : homepageData.zh.summary

  return (
    <Center>
      <Box pb={20} my={10} maxW='800px'>
        <Heading textAlign='center'>
          {summary.title}
        </Heading>
        <MotionBox animation='fade-up' pt={8} pb={9}>
          <Text
            fontSize='lg'
            fontWeight='bold'
            color='gray.200'
            textAlign='center'
          >
            {summary.content}
          </Text>
        </MotionBox>
          <HStack gap={{base: 5, lg: 10}} justifyContent='center'>
            <MotionBox animation='fade-left'>
              <Link to='/expressions'>
                <Button
                  colorScheme='yellow'
                  borderRadius='full'
                  size={{base: 'md', lg: 'lg'}}
                >
                  Browser Expressions
                </Button>
              </Link>
            </MotionBox>
            <MotionBox animation='fade-right'>
              {user ? (<Link to='/profile'>
                <Button
                  colorScheme='blue'
                  borderRadius='full'
                  size={{base: 'md', lg: 'lg'}}
                >
                  View Profile
                </Button>
              </Link>
              ) : (<Link to='/user/signin'>
                <Button
                  colorScheme='teal'
                  borderRadius='full'
                  size={{base: 'md', lg: 'lg'}}
                >
                  Join for Free
                </Button>
              </Link>)}
            </MotionBox>
          </HStack>
      </Box>
    </Center>
  )
}

export default Summary