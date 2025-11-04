import useLists from '@/hooks/interact/useLists'
import useLanguageStore from '@/languageStore'
import { Image, Box, Divider, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import profilePagesData from '@/data/profilePagesData'
import { pocketURL } from '@/services/pocket'

const ProfileListLink = () => {
  const lang = useLanguageStore(s => s.language)
  const [selected, setSelected] = useState<string | null>(null)
  const list = lang === 'en' ? profilePagesData.en.list : profilePagesData.zh.list

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
                  {p.title}
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
                <Image
                  boxSize='50px'
                  objectFit='cover'
                  borderRadius='10px'
                  src={`${pocketURL}${p.items[0]?.expression.image}`}
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