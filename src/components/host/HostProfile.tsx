import Host from '@/entities/Host'
import { Avatar, Box, Heading, Image, Text } from '@chakra-ui/react'
import SubscribeButton from './SubscribeButton'
import useFollowManager from '@/hooks/useFollowManager'

const HostProfile = ({ host }: { host: Host }) => {
  const { marked, toggleMarked } = useFollowManager(host.id, host.followed)

  return (
    <>
      <Box position='relative'>
        <Box height='200px' overflow='hidden'>
          <Image src={host.cover} objectFit='cover'/>
        </Box>
        <Avatar
          position='absolute'
          top='135px' 
          ml={5} 
          size='large'
          name={host.name} 
          src={host.portrait}
          sx={{boxShadow: '0 0 0 5px #CBD5E0'}}
        />
      </Box>
      <Box p={5}>
        <Box pb={5} textAlign='right'>
          <SubscribeButton 
            followed={marked} 
            onToggle={toggleMarked}
          />
        </Box>
        <Heading fontSize='3xl'>
          {host?.name}
        </Heading>
        <Text fontSize='lg' color='gray.300' pb={3}>
          {`@${host?.slug}`}
        </Text>
      </Box>
    </>
  )
}

export default HostProfile