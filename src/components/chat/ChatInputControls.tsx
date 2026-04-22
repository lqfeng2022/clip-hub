import { useAuth } from '@/AuthContext'
import useCredit from '@/hooks/billing/useCredit'
import { HStack, Icon } from '@chakra-ui/react'
import { CiKeyboard, CiMicrophoneOn, CiPhone } from 'react-icons/ci'
import { IoAddOutline, IoVideocamOutline } from 'react-icons/io5'
import { RiSpeakLine, RiEmotionLaughLine } from 'react-icons/ri' 

interface Props {
  isSpeakOn: boolean
  isEnhancement: boolean
  isTtsOn: boolean
  onToggleSpeak: () => void
  onToggleCall: () => void
  onToggleEnhancement: () => void
  onToggleTts: () => void
}
const ChatInputControls = ({ 
  isSpeakOn, 
  isEnhancement,
  isTtsOn,
  onToggleSpeak, 
  onToggleCall, 
  onToggleEnhancement,
  onToggleTts
}: Props) => {
  const { user } = useAuth()
  const { data: credit } = useCredit()

  const balance = credit?.lifetime_credits - credit?.lifetime_debits

  const canAudioChat = balance >= 100
  const canCall = !!user?.bro && (balance >= 1000)

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
        {/* TTS toggle */}
        {isSpeakOn && (
          <Icon
          boxSize='22px'
          as={RiSpeakLine}
          cursor='pointer'
          color={isTtsOn ? 'orange.200' : 'gray.400'}
          onClick={onToggleTts}
          />
        )}
        {/* Enhancement / Emoji toggle */}
        {isSpeakOn && isTtsOn && (
          <Icon
            boxSize='22px'
            as={RiEmotionLaughLine}
            cursor='pointer'
            color={isEnhancement ? 'blue.200' : 'gray.100'}
            onClick={onToggleEnhancement}
          />
        )}
      </HStack>
    </HStack>
  )
}

export default ChatInputControls