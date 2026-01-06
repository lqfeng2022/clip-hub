import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import HostProfile from '@/components/host/HostProfile'
import HostTabs from '@/components/host/HostTabs'
import useHost from '@/hooks/store/useHost'
import { Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import AllPosts from '@/components/product/AllPosts'
import { useEffect } from 'react'
import useProductFilterStore from '@/stores/productFilterStore'

const HostDetailPage = () => {
  const { hostSlug } = useParams<{hostSlug?: string}>() // get `slug` from url
  const { data: host, isLoading, error } = useHost(hostSlug!)

  // set host ID when host is loaded
  const setHostId = useProductFilterStore((s) => s.setHostId)
  useEffect(() => {
    if (host?.id) setHostId(host.id)
  }, [host?.id])
  
  if (!hostSlug) return <Text>No Host found</Text>
  if (isLoading) return <BeatLoader/>
  if (error) throw error

  return (
    <Stack gap={0}>
      <PageNavTab title={host?.name}/>
      <HostProfile host={host!}/>
      <HostTabs/>
      <AllPosts/>
    </Stack>
)
}

export default HostDetailPage