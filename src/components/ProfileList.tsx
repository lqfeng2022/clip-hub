import { Box, Heading, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { IoIosHeart } from 'react-icons/io'
import { IoIosBookmark } from 'react-icons/io'
import { RiChatHistoryFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { TbLanguageHiragana } from "react-icons/tb";

const ProfileList = () => {
  const list = [
    { name: 'Profile', icon: CgProfile, link: '/' },
    { name: 'Expression', icon: TbLanguageHiragana, link: '/' },
    { name: 'Bookmark', icon: IoIosBookmark, link: '/' },
    { name: 'Like', icon: IoIosHeart, link: '/' },
    { name: 'History', icon: RiChatHistoryFill, link: '/' },
  ]

  return (
    <Box mt={8}>
      <Heading fontSize='2xl' mb={3}>
        Profile List
      </Heading>
      <List>
        {list.map((p) => (
          <ListItem py='15px' key={p.name}>
            <HStack spacing={4}>
              <Icon as={p.icon} boxSize={10}/>
              <Text fontSize='xl'>{p.name}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileList