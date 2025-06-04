import Clip from './Clip'

export default interface Epbook {
  id: number,
  video: Clip,
  visible: boolean,
  timestamp: string
}