import { useAuth } from '@/AuthContext'
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
  const canCall = !!user?.bro

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
          cursor='pointer'
          onClick={onToggleSpeak}
        />
        {/* CALL mode (UI only) */}
        <Icon
          as={CiPhone}
          boxSize={6}
          cursor={canCall ? 'pointer' : ''}
          color={isCalling ? 'orange' : (canCall ? undefined : 'gray.500')}
          onClick={() => { if (canCall) onToggleCall() }}
          title={canCall ? 'Start call' : "Call unavailable cus you're not bro"}
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