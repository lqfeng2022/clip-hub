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
import HostCourses from '@/components/host/HostCourses'

const HostDetailPage = () => {
  const { hostSlug } = useParams<{hostSlug?: string}>() // get `slug` from url

  const { data: host, isLoading, error } = useHost(hostSlug!)
  const tab = useProductFilterStore(s => s.hostTab)
  
  // set host ID when host is loaded
  const setPlaylistHostId = usePlaylistQueryStore((s) => s.setCourseId)
  const setProductHostId = useProductFilterStore((s) => s.setHostId)

  // Sync host ID into stores
  useEffect(() => {
    if (!host?.id) return
    setProductHostId(host.id)
    setPlaylistHostId(host.id)
  }, [host?.id, setProductHostId, setPlaylistHostId])
  
  if (!hostSlug) return <Text>No Host found</Text>
  if (isLoading) return <BeatLoader/>
  if (error) throw error
  if (!host) return null

  // Tab content
  const renderTabContent = () => {
    switch (tab) {
      case 'Playlists':
        return <HostPlaylists />
      case 'Courses':
        return <HostCourses />
      default:
        return <AllPosts />
    }
  }

  return (
    <Stack gap={0}>
      <PageNavTab title={host?.name}/>
      <HostProfile host={host!}/>
      <HostTabs/>
      {renderTabContent()}
    </Stack>
)
}

export default HostDetailPage