import { Avatar, Badge, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SubscribeButton from './SubscribeButton'
import Host from '@/entities/Host'
import useFollowManager from '@/hooks/useFollowManager'

interface Props {
  host: Host,
}
const SubscribeList = ({ host }: Props) => {
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
          <HStack>
            <Text fontWeight='semibold' lineHeight={1}>
              {host.name}
            </Text>
            <Text color='gray' fontSize='sm'>@{host.slug}</Text>
            <Badge colorScheme='green' fontWeight='light'>Host</Badge>
          </HStack>
          <HStack gap={2}>
            <Text color='yellow.200' fontWeight='semibold'>
              {host.videos_count} {host.subtitles_count} {host.expressions_count}
            </Text>
            <Text fontWeight='light' color='gray.200'>
              videos/clips/words
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