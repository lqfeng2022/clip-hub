import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, ListItem, OrderedList, SimpleGrid, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSignup from '../hooks/useSignup'
import PasswordInput from '../components/PasswordInput'
import SignContainer from '../components/SignContainer'
import useLanguageStore from '@/languageStore'

const SignupPage = () => {
  const { mutate, error }= useSignup()
  const navigate = useNavigate()

  const [signup, setSignup] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
  })

  const handleChange = (field: keyof typeof signup) =>
    (e: ChangeEvent<HTMLInputElement> | string) => {
      // if e is typeof `string`, return it directly,
      // otherwise return e.target.value, cus it's type of `ChangeEvent`
      const value = (typeof e === 'string') ? e : e.target.value
      setSignup(prev => ({ ...prev, [field]: value }))
    }

  const handleSignup = () => {
    const { password2, ...payload } = signup
    mutate( payload, { onSuccess: () => navigate('/user/signin') })
  }

  const lang = useLanguageStore(s => s.language)
  const context = lang === 'en' ? {
    header: "Sign up", 
    note: "to continue to CLIPs",
    username: "User name",
    password: "Set your password",
    password_note: [ 
      { id: 1, content: "Your password can’t be too similar to your other personal information." }, 
      { id: 2, content: "Your password must contain at least 8 characters." },
      { id: 3, content: "Your password can’t be a commonly used password." },
      { id: 4, content: "Your password can’t be entirely numeric." },
    ],
    password_2: "Confirm your password",
    password2_note: "You really got your pw, bro",
    password2_error: "Hey, you gotta hit it again, bro",
    email: "Email address",
    email_place: "Enter your email",
    first_name: "First name",
    last_name: "Last name",
    signup_lang: "Sign Up",
  } : {
    header: "注册", 
    note: "为了更好的的用户体验",
    username: "用户名",
    password: "设置你的密码",
    password_note: [ 
      { id: 1, content: "请勿使用包含个人信息字符的密码。" }, 
      { id: 2, content: "你的密码必须包含至少8个字符，但不可以是纯数字。" },
      { id: 3, content: "请不要使用容易被猜测到的密码。" },
    ],
    password_2: "请确认你的密码",
    password2_note: "哟，你还真记得你设置的密码",
    password2_error: "嘿，你得再输入一次～",
    email: "Email 地址",
    email_place: "输入你的 email",
    first_name: "名字",
    last_name: "姓氏",
    signup_lang: "提交注册",
  }

  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNUP header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>{context.header}</Heading>
          <Text pt={2}>{context.note}</Text>
        </Box>
        <Stack spacing={5}>
          {/* INPUT username */}
          <FormControl isRequired>
            <FormLabel>{context.username}</FormLabel>
            <Input 
              type='text' 
              placeholder={`${context.username}..`}
              value={signup.username}
              onChange={handleChange('username')}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          {/* SET password */}
          <FormControl isRequired>
            <FormLabel>{context.password}</FormLabel>
            <PasswordInput 
              value={signup.password} 
              onChange={handleChange('password')}
            />
            <FormHelperText>
              <OrderedList spacing={1.5}>
                {context.password_note.map((note) => 
                  <ListItem key={note.id}>
                    {note.content}
                  </ListItem>
                )}
              </OrderedList>
            </FormHelperText>
          </FormControl>
          {/* CONVORM password */}
          <FormControl isRequired>
            <FormLabel>{context.password_2}</FormLabel>
            <PasswordInput 
              value={signup.password2} 
              onChange={handleChange('password2')}
            />
            {signup.password2 === signup.password ? 
              <FormHelperText>{context.password2_note}</FormHelperText>
              : <FormHelperText color='red.300'>{context.password2_error}</FormHelperText>
            }
          </FormControl>
          {/* INPUT EMAIL */}
          <FormControl isRequired>
            <FormLabel>{context.email}</FormLabel>
            <Input 
              type='email'
              placeholder={context.email_place}
              value={signup.email} 
              onChange={handleChange('email')}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
          {/* GIVE first_name/last_name optionally */}
          <HStack>
            <FormControl>
              <FormLabel>{context.first_name}</FormLabel>
              <Input 
                placeholder={context.first_name} 
                value={signup.first_name}
                onChange={handleChange('first_name')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>{context.last_name}</FormLabel>
              <Input 
                placeholder={context.last_name}
                value={signup.last_name} 
                onChange={handleChange('last_name')}
              />
            </FormControl>
          </HStack>
          {/* SIGN UP submit button */}
          <Button 
            mt={2} 
            size='md' 
            fontSize='lg' 
            onClick={handleSignup}
          >
            {context.signup_lang}
          </Button>
        </Stack>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SignupPage