import { signupTexts } from '@/data/signupTexts'
import useLanguageStore from '@/languageStore'
import { SignupForm, signupSchema } from '@/validation/signupSchema'
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, ListItem, OrderedList, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SignContainer from '../components/SignContainer'
import useSignup from '../hooks/useSignup'
import PasswordInput from '@/components/PasswordInput'

const SignupPage = () => {
  const lang = useLanguageStore(s => s.language)
  const context = lang === 'en' ? signupTexts.en : signupTexts.zh

  const navigate = useNavigate()
  const { mutate, error }= useSignup()

  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = (data: SignupForm) => {
    const { password2, first_name, last_name, ...rest } = data
    // cus first_name/last_name can be undefined, 
    // we gotta convert them to null before mutating using `??`
    const payload = {
      ...rest,
      first_name: first_name ?? null,
      last_name: last_name ?? null,
    }
    mutate(payload, { onSuccess: () => navigate('/user/signin') })
  }

  return (
    <SignContainer>
      <SimpleGrid columns={{sm: 1, md: 2}}>
        {/* SIGNUP header */}
        <Box mb={5}>
          <Heading fontSize='4xl'>{context.header}</Heading>
          <Text pt={2}>{context.note}</Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            {/* INPUT username */}
            <FormControl isRequired>
              <FormLabel>{context.username}</FormLabel>
              <Input
                type='text'
                placeholder={`${context.username}..`}
                {...register('username')}
              />
              {errors.username ? (
                <FormHelperText color='red.300'>{errors.username.message}</FormHelperText>
              ) : (
                <FormHelperText>{error?.message}</FormHelperText>
              )}
            </FormControl>
            {/* SET password */}
            <FormControl isRequired>
              <FormLabel>{context.password}</FormLabel>
              <PasswordInput
                PasswordInput={register('password')}
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
              {errors.password && <FormHelperText color='red.300'>{errors.password.message}</FormHelperText>}
            </FormControl>
            {/* CONVORM password */}
            <FormControl isRequired>
              <FormLabel>{context.password_2}</FormLabel>
              <PasswordInput
                PasswordInput={register('password2')}
              />
              {!errors.password2 ? (
                <FormHelperText>{context.password2_note}</FormHelperText>
              ) : (
                <FormHelperText color='red.300'>{errors.password2.message}</FormHelperText>
              )}
            </FormControl>
            {/* INPUT EMAIL */}
            <FormControl isRequired>
              <FormLabel>{context.email}</FormLabel>
              <Input
                type='email'
                placeholder={context.email_place}
                {...register('email')}
              />
              {errors.email ? (
                <FormHelperText color='red.300'>{errors.email.message}</FormHelperText>
              ) : (
                <FormHelperText>{error?.message}</FormHelperText>
              )}
            </FormControl>
            {/* GIVE first_name/last_name optionally */}
            <HStack>
              <FormControl>
                <FormLabel>{context.first_name}</FormLabel>
                <Input
                  placeholder={context.first_name}
                  {...register('first_name')}
                />
                {errors.first_name && <FormHelperText color='red.300'>{errors.first_name.message}</FormHelperText>}
              </FormControl>
              <FormControl>
                <FormLabel>{context.last_name}</FormLabel>
                <Input
                  placeholder={context.last_name}
                  {...register('last_name')}
                />
                {errors.last_name && <FormHelperText color='red.300'>{errors.last_name.message}</FormHelperText>}
              </FormControl>
            </HStack>
            {/* SIGN UP submit button */}
            <Button
              mt={2}
              size='md'
              fontSize='lg'
              type='submit'
            >
              {context.signup_lang}
            </Button>
          </Stack>
        </form>
      </SimpleGrid>
    </SignContainer>
  )
}

export default SignupPage