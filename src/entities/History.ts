import Clip from './Clip'

export default interface ClipInteract {
  id: number,
  video: Clip,
  visible: boolean,
  timestamp: string
}