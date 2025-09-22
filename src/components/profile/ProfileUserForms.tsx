import { useAuth } from '@/AuthContext'
import { profileData } from '@/data/profileData'
import useProfileUpdate from '@/hooks/useProfileUpdate'
import useLanguageStore from '@/languageStore'
import { ProfileForm, profileSchema } from '@/validation/profileSchema'
import { Box, Button, FormControl, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Text, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CiPhone } from 'react-icons/ci'
import { MdAlternateEmail } from 'react-icons/md'

const ProfileUserForms = () => {
  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' ? profileData.en  : profileData.zh

  // Sync user data once loaded
  const { user, fetchUser } = useAuth()
  const { mutate } = useProfileUpdate()
  const toast = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birth_date: '',
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        birth_date: user.birth_date || '',
      })
    }
  }, [user, reset])

  const onSubmit = (data: ProfileForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: 'Success!', status: 'success', duration: 2000 }),
        fetchUser()
      },
      onError: () => toast({ 
        title: 'Upload failed', status: 'error', duration: 2000 
      })
    })
  }

  if (!user) return null
  return (
    <Box px={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 0)username */}
        <Box mb={7}>
          <Heading fontSize='lg'>{content.username.name}</Heading>
          <Text py={2}>{content.username.note}</Text>
          <FormControl maxW='600px' pb={3}>
            <Input value={`@${user.username}`} disabled/>
          </FormControl>
        </Box>
        {/* 1)Name (first_anme / last_name) */}
        <Box mb={7}>
          <Heading fontSize='lg'>{content.name.name}</Heading>
          <Text py={2}>{content.name.note}</Text>
          <HStack maxW='600px'>
            <FormControl>
              <Input
                placeholder='First name'
                {...register('first_name')}
              />
              {errors.first_name && (
                <Text color="red.500" fontSize="sm">{errors.first_name.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <Input
                placeholder='Last name'
                {...register('last_name')}
              />
              {errors.last_name && (
                <Text color="red.500" fontSize="sm">{errors.last_name.message}</Text>
              )}
            </FormControl>
          </HStack>
        </Box>
        {/* 2)Contact info (email/phone) */}
        <Box mb={7}>
          <Heading fontSize='lg'>{content.contact.name}</Heading>
          <Text py={2}>{content.contact.note}</Text>
          <FormControl maxW='600px' pb={3}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={MdAlternateEmail} boxSize={6} color='gray'/>
              </InputLeftElement>
              <Input
                type='email'
                placeholder='Email address'
                {...register('email')}
              />
            </InputGroup>
            {errors.email && (
              <Text color="red.500" fontSize="sm">{errors.email.message}</Text>
            )}
          </FormControl>
          <FormControl maxW='600px'>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={CiPhone} boxSize={6} color='gray'/>
              </InputLeftElement>
              <Input
                type='tel'
                placeholder='Phone number'
                {...register('phone')}
              />
            </InputGroup>
            {errors.phone && (
              <Text color="red.500" fontSize="sm">{errors.phone.message}</Text>
            )}
          </FormControl>
        </Box>
        {/* 3)Birthday form */}
        <Box mb={7}>
          <Heading fontSize='lg'>{content.birthday.name}</Heading>
          <Text py={2}>{content.birthday.note}</Text>
          <FormControl maxW='600px'>
            <Input
              type='date'
              placeholder='Your birthday'
              {...register('birth_date')}
            />
            {errors.birth_date && (
              <Text color="red.500" fontSize="sm">{errors.birth_date.message}</Text>
            )}
          </FormControl>
        </Box>
        <Button
          m='20px 10px 60px 0px'
          maxW='100px'
          size='md'
          fontSize='lg'
          type="submit"
        >
          {lang === 'en' ? 'Publish' : '保存信息'}
        </Button>
      </form>
    </Box>
  )
}

export default ProfileUserForms