import Host from '@/entities/Host'
import { Avatar } from '@chakra-ui/react'

interface Props {
  host: Host,
  size: string
}
const HostAvatar = ({ host, size }: Props) => {
  return (
    <Avatar
      size={size}
      fontWeight='bold'
      name={host.name}
      src={host.portrait}
      className='img-hover'
    />
  )
}

export default HostAvatar