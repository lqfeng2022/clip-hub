import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import useSignin from '../hooks/useSignin'
import SignContainer from '../components/SignContainer'
import useLanguageStore from '@/languageStore'
import { signinTexts } from '@/data/signinTexts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninForm, signinSchema } from '@/validation/signinSchema'
import PasswordInput from '@/components/PasswordInput'

const SigninPage = () => {
  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' ? signinTexts.en : signinTexts.zh
  
  const { mutate, error } = useSignin()
  const { fetchUser } = useAuth()
  const navigate = useNavigate()

  const message = error ? content.message_error : content.message_note

  const { register, handleSubmit, formState: { errors } } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema)
  })
  
  const onSubmit = (data: SigninForm) => {
    mutate(data, {
      onSuccess: () => {
        fetchUser()
        navigate('/profile')
      }
    })
  }
  
  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNIN header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>{content.header}</Heading>
          <Text pt={2}>{content.note}</Text>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* INPUT username */}
            <FormControl>
              <FormLabel>{content.username} :</FormLabel>
              <Input 
                type='text' 
                placeholder={`${content.username}..`}
                {...register("username")}
              />
              <FormHelperText color={errors.username ? 'red.300' : (error ? 'red.300' : undefined)}>
                {errors.username ? errors.username.message : message}
              </FormHelperText>
            </FormControl>
            {/* ENTER password */}
            <FormControl py={8}>
              <FormLabel>{content.password} :</FormLabel>
              <PasswordInput 
                PasswordInput={register("password")}
              />
              <FormHelperText color={errors.password ? 'red.300' : (error ? 'red.300' : undefined)}>
                {errors.password ? errors.password.message : message}
              </FormHelperText>
            </FormControl>
            {/* LOGIN button */}
            <Button mb={5} size='md' fontSize='lg' type="submit">
              {content.login_lang}
            </Button>
          </form>
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