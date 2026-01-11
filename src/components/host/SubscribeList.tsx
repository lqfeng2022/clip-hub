import Host from '@/entities/Host'
import useFollowManager from '@/hooks/useFollowManager'
import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SubscribeButton from './SubscribeButton'

const SubscribeList = ({ host }: { host: Host }) => {
  const { marked, toggleMarked } = useFollowManager(host.id, host.followed)

  return (
    <HStack justifyContent='space-between' alignItems='flex-start'>
      <HStack spacing={5} alignItems='flex-start'>
        {/* AVATAR */}
        <Link to={`/host/${host.slug}`}>
          <Avatar
            size='xl'
            fontWeight='bold'
            name={host.name}
            src={host.portrait}
            _hover={{boxShadow: '0 0 0 5px #CBD5E0'}}
            transition='.15s'
             opacity={0.8}
          />
        </Link>
        {/* HOST INFO */}
        <Stack gap={2}>
          <HStack>
            <Text fontWeight='semibold' lineHeight={1}>
              {host.name}
            </Text>
            <Text color='gray' fontSize='sm'>@{host.slug}</Text>
          </HStack>
          <Stack gap={0} lineHeight='1.2'>
            <Text color='yellow.200' fontWeight='semibold'>
              {host.videos_count} {host.subtitles_count} {host.expressions_count}
            </Text>
            <Text fontWeight='light' color='gray.200' fontSize='xs'>
              videos/clips/words
            </Text>
          </Stack>
        </Stack>
      </HStack>
      {/* SUBSCRIBE button */}
      <SubscribeButton 
        followed={marked} 
        onToggle={toggleMarked}
      />
    </HStack>
  )
}

export default SubscribeList