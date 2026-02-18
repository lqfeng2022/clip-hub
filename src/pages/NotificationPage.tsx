import PageNavTab from '@/components/PageNavTab'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { Heading, Stack, Text } from '@chakra-ui/react'

const NotificationPage = () => {
  const lang = useLanguageStore((s) => s.language)

  const header = lang === 'en' 
    ? profilePagesData.en.notification : profilePagesData.zh.notification

  return (
    <>
      <PageNavTab title={header}/>
      <Stack textAlign='start' m={5} h='90vh'>
        <Heading fontSize='xl'>
          Nothing to see here — yet
        </Heading>
        <Text color='gray.400' fontSize='sm'>
          When someone mentions you, you’ll find it here.
        </Text>
      </Stack>
    </>
  )
}

export default NotificationPage