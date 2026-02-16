import PageNavTab from '@/components/PageNavTab'
import { LANGUAGES } from '@/data/languages'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { HStack, Icon, List, ListItem, Text, Image, Stack } from '@chakra-ui/react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

const LanguageSettingPage = () => {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  const header = language === 'en' 
    ? profilePagesData.en.languages : profilePagesData.zh.languages

  return (
    <>
      <PageNavTab title={header}/>
      <List my={8} px={5} pb='200px'>
        {LANGUAGES.map((lang, index) => (
          <ListItem 
            key={index}
            p={2}
            borderBottom='1px'
            borderColor='gray.500'
            opacity={lang.disabled ? 0.4 : 1}
            cursor={lang.disabled ? 'not-allowed' : 'pointer'}
            _hover={lang.disabled ? {} : {background: 'gray.700'}}
            onClick={() => !lang.disabled && setLanguage(lang.code, true)}
          >
            <HStack justifyContent='space-between'>
              <HStack spacing={4}>
                <Image src={lang.icon} boxSize={14}/>
                <Stack spacing={1}>
                  <Text fontWeight='semibold' color='gray.200' fontSize='sm'>
                    {lang.title}
                  </Text>
                  <Text color='gray.200' fontSize='sm'>
                    {lang.nativeLabel}
                  </Text>
                </Stack>
              </HStack>
              <Icon 
                as={IoIosCheckmarkCircleOutline}
                fontSize='28px' 
                color={language === lang.code ? 'yellow.200' : 'gray.500'}
              />
            </HStack>
          </ListItem>
          ))}
      </List>
    </>
  )
}

export default LanguageSettingPage