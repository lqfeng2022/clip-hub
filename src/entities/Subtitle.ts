import Expression from './Expression'
import Host from './Host'
import Video from './Video'

export default interface Subtitle {
  id: number,
  order: number,
  title: string,
  content: string,
  video: Video,
  host: Host,
  expressions: Expression[],
  created_at: string,
  updated_at: string,
}