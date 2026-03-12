// components/chat/RealtimeCall.ts
import Host from '@/entities/Host'
import { formatDuration } from '@/helps/formatDate'
import { useCallRealtime } from '@/hooks/interact-call/useCallRealtime'
import { Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { CiPhone } from 'react-icons/ci'
import HostAvatar from '../host/HostAvatar'

interface Props {
  callId: string
  host: Host
  onCallEnd?: () => void
}
const RealtimeCall = ({ callId, host, onCallEnd }: Props) => {
  const { connected, duration, endCall, callBlockReason } = useCallRealtime(callId, host)

  const messages = {
    'mic-unavailable': 'Microphone is not available.',
    'permission-denied': 'Please allow microphone access.',
    'device-muted': 'Your microphone is muted.',
  }

  const handleEnd = () => {
    endCall()
    onCallEnd?.()
  }

  return (
    <HStack 
      spacing={4} 
      align='center' 
      justifyContent='space-between'
      pb={3}
    >
      {/* Host info */}
      <HStack align='flex-start' spacing={2}>
        <HostAvatar host={host} size='middle'/>
        <Stack>
          <Heading fontWeight='bold' fontSize='lg'>
            {host.name}
          </Heading>
          <Text fontWeight='bold' fontSize='md' color='gray.200'>
            {formatDuration(duration)}
          </Text>
          {callBlockReason && <Text color='red.300' fontWeight='bold' fontSize='sm'>
            {messages[callBlockReason]}
            </Text>
          }
        </Stack>
      </HStack>
      {/* Call status & control */}
      <Stack>
        <Text fontSize='md' opacity={0.6}>
          {connected ? 'In Call' : 'Calling'}
        </Text>
        <Icon
          as={CiPhone}
          boxSize={10}
          borderRadius='full'
          p={2}
          bg='red.300'
          cursor='pointer'
          _hover={{ bg: 'gray.300' }}
          onClick={handleEnd}
        />
      </Stack>
    </HStack>
  )
}

export default RealtimeCall