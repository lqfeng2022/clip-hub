import { useAuth } from '@/AuthContext'
import HpIntro from '@/pages/HomeIntroPage'
import ProductFeed from '@/components/product/FeedPosts'
import FeedTabs from '@/components/product/FeedTabs'
import FollowingPosts from '@/components/product/FollowingPosts'
import { Box, Show } from '@chakra-ui/react'
import { useState } from 'react'

const HomePage = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'For You' | 'Following'>('For You')

  return (
    <>
      {user ? (
        <Box>
          <FeedTabs onChange={setActiveTab}/>
          {(activeTab === 'For You') && <ProductFeed />}
          {(activeTab === 'Following') && <FollowingPosts />}
        </Box>
      ) : (
        <Box>
          <Show above='lg'>
            <ProductFeed/>
          </Show>
          <Show below='xl'>
            <HpIntro/>
          </Show>
        </Box>
      )}
    </>
  )
}

export default HomePage