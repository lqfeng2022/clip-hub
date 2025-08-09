import useLists from '@/hooks/interact/useLists'
import useLanguageStore from '@/languageStore'
import { Avatar, Box, Divider, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { IoIosHeartEmpty } from 'react-icons/io'
import { CiCircleList } from 'react-icons/ci'
import { MdHistoryToggleOff } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ProfileListLink = () => {
  const lang = useLanguageStore(s => s.language)
  const [selected, setSelected] = useState<string | null>(null)

  const list = [
    { title: 'Profile', title_ch: '个人资料', icon: CiUser, link: '/profile' },
    { title: 'History', title_ch: '浏览记录', icon: MdHistoryToggleOff, link: '/profile/history' },
    { title: 'Liked words', title_ch: '喜欢的表达式', icon: IoIosHeartEmpty, link: '/profile/expression' },
    { title: 'Your Lists', title_ch: '表达式列表', icon: CiCircleList, link: '/profile/list' },
  ]

  const { data, error } = useLists()
  const collections = data?.pages[0].results.slice(0, 9)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='gray'/>
      <List>
        {list.map((p) => (
          <ListItem 
            py='18px' 
            key={p.title}
            onClick={() => setSelected(p.title)}
          >
            <HStack spacing={3}>
              <Icon 
                as={p.icon} 
                boxSize={7} 
                color={selected === p.title ? 'yellow.300' : ''}
              />
              <Link to={p.link}>
                <Text fontSize='lg' as='strong'>
                  {lang === 'en' ? p.title : p.title_ch}
                </Text>
              </Link>
            </HStack>
          </ListItem>
        ))}
        <Box p={2}>
          {collections?.map((p) => (
            <ListItem 
              pb='25px' 
              key={p.title}
              onClick={() => setSelected(p.title)}
            >
              <HStack spacing={3}>
                <Avatar 
                  size='sm' 
                  fontWeight='bold' 
                  name={p.title}
                />
                <Link to={`/profile/list/${p.slug}`}>
                  <Text 
                    fontSize='md' 
                    fontWeight={selected === p.title ? 'bold' : 'normal'}
                  >
                    {p.title}
                  </Text>
                </Link>
              </HStack>
            </ListItem>
          ))}
        </Box>
      </List>
    </Box>
  )
}

export default ProfileListLink