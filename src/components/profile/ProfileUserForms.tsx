import { Box, Button, FormControl, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CiPhone } from 'react-icons/ci'
import { MdAlternateEmail } from 'react-icons/md'
import { useAuth } from '@/AuthContext'
import useProfileUpdate from '@/hooks/useProfileUpdate'
import useLanguageStore from '@/languageStore'

const ProfileUserForms = () => {
  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' ? {
    username: { name: "username", note: "Currently, username is your only identity of this web.."},
    name: { name: "Name", note: "Choose a name that represents you and your content." },
    contact: { name: "Contact info", note: "Let us know how to contact you with better services." },
    birthday: { name: "Birthday", note: "Choose a date as your birthday, maybe, you're gonna get some surprise." },
  }  : {
    username: { name: "用户名", note: "目前呢，用户名是你在本站的唯一凭证.."},
    name: { name: "名字", note: "选择一个名字来代表你自己.." },
    contact: { name: "联络信息", note: "为了提供更好的服务，让我们知道如何联络你.." },
    birthday: { name: "生日", note: "选择一个日期作为你的生日，或许会有惊喜.." },
  }

  // Sync user data once loaded
  const { user, fetchUser } = useAuth()
  const { mutate } = useProfileUpdate()
  const toast = useToast()

  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', birth_date: ''
  })

  useEffect(() => {
    if (!user) return
    const { first_name, last_name, email, phone, birth_date } = user
    setFormData({
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
      phone: phone || '',
      birth_date: birth_date || '',
    })
  }, [user])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success!', status: 'success', duration: 2000 }),
        fetchUser()
      },
      onError: () => toast({ title: 'Upload failed', status: 'error', duration: 2000 })
    })
  }

  if (!user) return null
  return (
    <>
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
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder='Last name'
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
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
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl maxW='600px'>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={CiPhone} boxSize={6} color='gray'/>
            </InputLeftElement>
            <Input 
              type='tel' 
              placeholder='Phone number' 
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </InputGroup>
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
            value={formData.birth_date ?? ''}
            onChange={(e) => handleChange('birth_date', e.target.value)}
          />
        </FormControl>
      </Box>
      <Button 
        m='20px 10px 80px' 
        maxW='100px'
        size='md' 
        fontSize='lg' 
        onClick={handleSubmit}
      >
        {lang === 'en' ? 'Publish' : '保存信息'}
      </Button>
    </>
  )
}

export default ProfileUserForms