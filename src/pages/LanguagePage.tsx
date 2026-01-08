import PageNavTab from '@/components/PageNavTab'
import languages from '@/data/languages'
import useLanguageStore from '@/stores/languageStore'
import { HStack, Icon, List, ListItem, Text, Image, Stack } from '@chakra-ui/react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

const LanguageSettingPage = () => {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  const langImages = languages.content

  return (
    <>
      <PageNavTab title={'Languages'}/>
      <List my={8} px={5} pb='200px'>
        {langImages.map((lang, index) => (
          <ListItem 
            key={index}
            p={2}
            borderBottom='1px'
            borderColor='gray.500'
            opacity={lang.disabled ? 0.4 : 1}
            cursor={lang.disabled ? 'not-allowed' : 'pointer'}
            _hover={lang.disabled ? {} : {background: 'gray.700'}}
            onClick={() => !lang.disabled && setLanguage(lang.code)}
          >
            <HStack justifyContent='space-between'>
              <HStack spacing={4}>
                <Image src={lang.icon} boxSize={14}/>
                <Stack spacing={1}>
                  <Text fontWeight='semibold' color='gray.200' fontSize='sm'>
                    {lang.title}
                  </Text>
                  <Text color='gray.200' fontSize='sm'>
                    {lang.trans}
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