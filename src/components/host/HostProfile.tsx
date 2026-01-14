import Host from '@/entities/Host'
import useFollowManager from '@/hooks/useFollowManager'
import { Avatar, Box, Heading, Image, Text } from '@chakra-ui/react'
import SubscribeButton from './SubscribeButton'
import HostChatButton from '../HostChatButton'

const HostProfile = ({ host }: { host: Host }) => {
  const { marked, toggleMarked } = useFollowManager(host.id, host.followed)

  return (
    <>
      <Box position='relative'>
        <Box h='200px' overflow='hidden'>
          <Image h='200px' w='100%' src={host.cover} objectFit='cover' opacity={0.85}/>
        </Box>
        <Avatar
          position='absolute'
          top='140px' 
          ml={5} 
          size='big'
          name={host.name} 
          src={host.portrait}
          sx={{boxShadow: '0 0 0 5px #CBD5E0'}}
        />
      </Box>
      <Box p={5}>
        <Box pb={10} textAlign='right'>
          <HostChatButton hostId={host.id.toString()}/>
          <SubscribeButton 
            followed={marked} 
            onToggle={toggleMarked}
          />
        </Box>
        <Heading fontSize='2xl'>
          {host?.name}
        </Heading>
        <Text fontSize='md' color='gray.300' pb={3}>
          {`@${host?.slug}`}
        </Text>
      </Box>
    </>
  )
}

export default HostProfile