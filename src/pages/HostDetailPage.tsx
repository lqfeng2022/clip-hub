import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import HostProfile from '@/components/host/HostProfile'
import HostTabs from '@/components/host/HostTabs'
import useHost from '@/hooks/store/useHost'
import { Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useProductFilterStore from '@/stores/productFilterStore'
import HostPlaylists from '@/components/host/HostPlaylists'
import AllPosts from '@/components/product/AllPosts'
import usePlaylistQueryStore from '@/stores/playlistStore'

const HostDetailPage = () => {
  const tab = useProductFilterStore(s => s.hostTab)
  
  const { hostSlug } = useParams<{hostSlug?: string}>() // get `slug` from url
  const { data: host, isLoading, error } = useHost(hostSlug!)
  
  // set host ID when host is loaded
  const setPlaylistHostId = usePlaylistQueryStore((s) => s.setHostId)
  const setProductHostId = useProductFilterStore((s) => s.setHostId)
  useEffect(() => {
    if (host?.id) {
      setProductHostId(host.id)
      setPlaylistHostId(host.id)
    }
  }, [host?.id])
  
  if (!hostSlug) return <Text>No Host found</Text>
  if (isLoading) return <BeatLoader/>
  if (error) throw error

  return (
    <Stack gap={0}>
      <PageNavTab title={host?.name}/>
      <HostProfile host={host!}/>
      <HostTabs/>
      {tab === 'Playlists' ? <HostPlaylists/> : <AllPosts/>}
    </Stack>
)
}

export default HostDetailPage