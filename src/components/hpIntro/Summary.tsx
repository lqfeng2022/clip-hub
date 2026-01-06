import homepageData from '@/data/homepageData'
import useLanguageStore from '@/stores/languageStore'
import { Center, Box, Heading, Text, Button, HStack } from '@chakra-ui/react'
import MotionBox from './MotionBox'
import { Link } from 'react-router-dom'
import { useAuth } from '@/AuthContext'

const Summary = () => {
  const { user } = useAuth()

  const lang = useLanguageStore(s => s.language)
  const english = lang === 'en'
  const summary = english ? homepageData.en.summary : homepageData.zh.summary
  const browser = english ? 'Explore More' : '搜索更多'
  const viewprofile = english ? 'View Profile' : '查看个人主页'
  const joinforfree = english ? 'Join for Free' : '免费注册使用'

  return (
    <Center>
      <Box pb={20} my={10} maxW='800px'>
        <Heading textAlign='center'>
          {summary.title}
        </Heading>
        <MotionBox animation='fade-up' pt={8} pb={9}>
          <Text fontWeight='light' textAlign='center'>
            {summary.content}
          </Text>
        </MotionBox>
        <HStack gap={{base: 5, lg: 10}} justifyContent='center'>
          <MotionBox animation='fade-left'>
            <Link to='/search'>
              <Button 
                size='md'
                borderRadius='full' 
                color='gray.800' 
                bg='yellow.100' 
                _hover={{bg: 'yellow.200'}}
              >
                {browser}
              </Button>
            </Link>
          </MotionBox>
          <MotionBox animation='fade-right'>
            <Link to={user ? '/profile' : '/user/signin'}>
              <Button 
                size='md'
                borderRadius='full' 
                color='gray.800' 
                bg='blue.100' 
                _hover={{bg: 'blue.200'}}
              >
                {user ? viewprofile : joinforfree}
              </Button>
            </Link>
          </MotionBox>
        </HStack>
      </Box>
    </Center>
  )
}

export default Summary