import Host from '@/entities/Host'
import { Avatar } from '@chakra-ui/react'

const HostAvatar = ({ host }: { host: Host }) => {
  return (
    <Avatar
      size='md'
      fontWeight='bold'
      name={host.name}
      src={host.portrait}
      className='img-hover'
    />
  )
}

export default HostAvatar