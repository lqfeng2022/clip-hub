import navListData from '@/data/navListData'
import useLanguageStore from '@/stores/languageStore'
import { Box, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavChatButton from './NavChatButton'
import UserAvatarTop from './UserAvatarTop'

interface Props {
  onItemClick?: () => void
}
const NavListDrawer = ({onItemClick}: Props) => {
  const [selected, setSelected] = useState<string | null>(null)
  const lang = useLanguageStore(s => s.language)

  return (
    <Box>
      <UserAvatarTop/>
      <List mt={2} maxW='232px'>
        {navListData.map((p) => (
          <ListItem
            p='10px 15px' my={2}
            key={p.title}
            onClick={() => {
              setSelected(p.title)
              onItemClick?.()
            }}
            _hover={{bg: 'gray.700', borderRadius: 'full'}}
          >
            <Link to={p.link}>
              <HStack spacing={5}>
                <Icon
                  as={p.icon}
                  boxSize='25px'
                  color={selected === p.title ? 'yellow.300' : ''}
                />
                <Text 
                  fontSize='lg' 
                  fontWeight={selected === p.title ? 'bold' : 'semibold'}
                >
                  {lang === 'en' ? p.title : p.title_ch}
                </Text>
              </HStack>
            </Link>
          </ListItem>
        ))}
      </List>
      <NavChatButton onItemClick={onItemClick}/>
    </Box>
  )
}

export default NavListDrawer