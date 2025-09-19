import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import useSignin from '../hooks/useSignin'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'
import useLanguageStore from '@/languageStore'

const SigninPage = () => {
  const { mutate, error } = useSignin()
  const { fetchUser } = useAuth()
  const navigate = useNavigate()

  const [signin, setSignin] = useState({ username: '', password: '' })

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignin(prev => ({ ...prev, username: e.target.value }))
  }
  const handlePasswordChange = (value: string) => {
    setSignin(prev => ({ ...prev, password: value }))
  }

  const handleSignin = () => {
    mutate(signin, {
      onSuccess: () => {
        fetchUser()
        navigate('/profile')
        // window.location.reload() // clear auth context
      }
    })
  }

  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' ? {
    header: "Sign in", 
    note: "to continue to ClipWords",
    username: "User name",
    password: "Enter your password",
    message_error: "Oops, please confrim your username or password",
    message_note: "Please protect your personal info..",
    login_lang: "Log In",
    signup_lang: "Sign Up",
    signup_message: "Don't have an account?",
  } : {
    header: "登陆", 
    note: "为了更好的的服务",
    username: "用户名",
    password: "输入你的密码",
    message_error: "喔～ 哪里出问题了，请再次确认用户名或者密码..",
    message_note: "请保护好你的个人信息..",
    login_lang: "进入",
    signup_lang: "注册",
    signup_message: "还没有帐号？",
  }
  const message = error ? content.message_error : content.message_note
  
  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNIN header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>{content.header}</Heading>
          <Text pt={2}>{content.note}</Text>
        </Box>
        <Box>
          {/* INPUT username */}
          <FormControl>
            <FormLabel>{content.username} :</FormLabel>
            <Input 
              type='text' 
              placeholder={`${content.username}..`}
              value={signin.username}
              onChange={handleUsernameChange}
            />
            <FormHelperText color={error ? 'red.300' : undefined}>
              {message}
            </FormHelperText>
          </FormControl>
          {/* ENTER password */}
          <FormControl py={8}>
            <FormLabel>{content.password} :</FormLabel>
            <PasswordInput 
              value={signin.password} 
              onChange={handlePasswordChange}
            />
            <FormHelperText color={error ? 'red.300' : undefined}>
              {message}
            </FormHelperText>
          </FormControl>
          {/* LOGIN button */}
          <Button mb={5} size='md' fontSize='lg' onClick={handleSignin}>
            {content.login_lang}
          </Button>
          {/* SIGN UP if you haven't an account */}
          <HStack justifyContent='end' gap={5}>
            <Text>{content.signup_message}</Text>
            <Link to='/user/signup'>
              <Button size='sm' variant='outline' colorScheme='yellow'>
                {content.signup_lang}
              </Button>
            </Link>
          </HStack>
        </Box>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SigninPage