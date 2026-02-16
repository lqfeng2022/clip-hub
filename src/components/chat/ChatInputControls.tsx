import { useAuth } from '@/AuthContext'
import useCredit from '@/hooks/billing/useCredit'
import { HStack, Icon, Badge } from '@chakra-ui/react'
import { CiKeyboard, CiMicrophoneOn, CiPhone } from 'react-icons/ci'
import { IoAddOutline, IoVideocamOutline } from 'react-icons/io5'
import { PiSmileyWinkDuotone } from 'react-icons/pi'

interface Props {
  isSpeakOn: boolean
  isCalling: boolean
  isEnhancement: boolean
  onToggleSpeak: () => void
  onToggleCall: () => void
  onToggleEnhancement: () => void
}
const ChatInputControls = ({ 
  isSpeakOn, 
  isCalling, 
  isEnhancement, 
  onToggleSpeak, 
  onToggleCall, 
  onToggleEnhancement 
}: Props) => {
  const { user } = useAuth()
  const { data: credit } = useCredit()

  const balance = credit?.lifetime_credits - credit?.lifetime_debits

  const canAudioChat = balance >= 100
  const canCall = !!user?.bro && (balance >= 1000)
  
  const chatMode = isCalling ? 'call' : (isSpeakOn ? 'audio' : 'text')
  const label = `${chatMode}-mode`

  const colorScheme = isCalling ? 'purple' : (isSpeakOn ? 'green' : 'blue')

  return (
    <HStack justifyContent='space-between' pt={1.5} textAlign='center'>
      <HStack gap={4}>
        {/* ADD files(images, videos, text, pdf...) */}
        <Icon as={IoAddOutline} boxSize={6} color='gray' cursor='pointer' />
        {/* CHAT mode: TEXT or AUDIO */}
        <Icon
          as={isSpeakOn ? CiKeyboard : CiMicrophoneOn}
          boxSize={6}
          cursor={canAudioChat ? 'pointer' : ''}
          color={canAudioChat ? undefined : 'gray.500'}
          onClick={() => { if (canAudioChat) onToggleSpeak() }}
          title={canAudioChat ? 'Start audio chat' 
            : "Audio chat unavailable cus you have not enough credits"
          }
        />
        {/* CALL mode (bro only) */}
        <Icon
          as={CiPhone}
          boxSize={6}
          cursor={canCall ? 'pointer' : ''}
          color={canCall ? undefined : 'gray.500'}
          onClick={() => { if (canCall) onToggleCall() }}
          title={canCall ? 'Start call' 
            : "Call unavailable cus you're not bro or credit balance is less than 1000"
          }
        />
        {/* VIDEO CALL mode */}
        <Icon as={IoVideocamOutline} boxSize={6} color='gray' />
        {/* Enhancement / Emoji toggle */}
        {isSpeakOn && (
          <Icon
            boxSize='22px'
            as={PiSmileyWinkDuotone}
            cursor='pointer'
            color={isEnhancement ? 'orange.200' : 'gray.100'}
            onClick={onToggleEnhancement}
          />
        )}
      </HStack>
      {/* Chat mode badge */}
      <Badge
        fontSize='0.8em'
        fontWeight={isEnhancement ? 'semibold' : 'light'}
        colorScheme={colorScheme}
      >
        {label}
      </Badge>
    </HStack>
  )
}

export default ChatInputControls