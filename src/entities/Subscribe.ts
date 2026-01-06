import Host from './Host';

export default interface Subscribe {
  id: number,
  host: Host,
  created_at: string,
  updated_at: string,
}