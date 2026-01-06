import Host from './Host'
import Subtitle from './Subtitle'
import Video from './Video'

export default interface Expression {
  id: number,
  title: string,
  slug: string,
  image: string,
  host: Host,
  video: Video,
  subtitle: Subtitle,
  created_at: string,
  updated_at: string,
}