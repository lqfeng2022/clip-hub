import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import EmptyCard from '../EmptyCard'
import useLanguageStore from '@/languageStore'
import { profilePages } from '@/data/profilePages'
import useChats from '@/hooks/interact/useChats'
import ExpressionCardChat from './ExpressionCardChat'

const ProfileChatSession = () => {
  const lang = useLanguageStore(s => s.language)
  const buttons = lang === 'en' ? profilePages.en : profilePages.zh

  const { data, error } = useChats()
  const chats = data?.pages[0].results.slice(0, 5)
  
  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {buttons.chat}
        </Heading>
        <Link to='chatsession'>
          <Button
            colorScheme='gray'
            size='sm'
            variant='outline'
            disabled={chats?.length === 0}
          >
            {buttons.view_all}
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {chats?.length === 0 && <EmptyCard/>}
        {chats?.map((chat) => (
          <ExpressionCardChat
            key={chat.expression.id}
            expression={chat.expression}
            messages={chat.messages_count}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileChatSession