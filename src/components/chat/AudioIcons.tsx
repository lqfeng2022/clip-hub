import { Icon } from '@chakra-ui/react'
import { PiWaveformBold, PiWaveformDuotone } from 'react-icons/pi'
import { RiVoiceprintFill, RiVoiceprintLine } from 'react-icons/ri'

const AudioIcons = () => {
  return (
    <>
      <Icon as={RiVoiceprintFill} />
      <Icon as={PiWaveformBold} />
      <Icon as={PiWaveformDuotone} />
      <Icon as={PiWaveformBold} />
      <Icon as={PiWaveformDuotone} />
      <Icon as={RiVoiceprintLine} />
    </>
  )
}

export default AudioIcons