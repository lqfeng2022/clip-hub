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
          />
        </Link>
        {/* HOST INFO */}
        <Stack gap={2}>
          <Stack gap={0}>
            <Text fontWeight='semibold' lineHeight={1}>
              {host.name}
            </Text>
            <Text color='gray' fontSize='xs'>@{host.slug}</Text>
          </Stack>
          <HStack gap={1} lineHeight='1.2'>
            <Text color='yellow.200' fontWeight='bold'>
              {host.videos_count}
            </Text>
            <Text color='yellow.400'>
              {host.subtitles_count}
            </Text>
            <Text color='yellow.500' fontWeight='light'>
              {host.expressions_count}
            </Text>
          </HStack>
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