import PageNavTab from '@/components/PageNavTab'
import { Heading, Stack, Text } from '@chakra-ui/react'

const NotificationPage = () => {
  return (
    <>
      <PageNavTab title='Notifications'/>
      <Stack textAlign='start' m={5} h='90vh'>
        <Heading fontSize='2xl'>
          Nothing to see here — yet
        </Heading>
        <Text color='gray.400'>
          When someone mentions you, you’ll find it here.
          </Text>
      </Stack>
    </>
  )
}

export default NotificationPage