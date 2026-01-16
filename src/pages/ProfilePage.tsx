import { useAuth } from '@/AuthContext'
import Subscriptions from '@/components/host/Subscriptions'
import PageNavTab from '@/components/PageNavTab'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { Stack } from '@chakra-ui/react'
import { useState } from 'react'
import LikedPosts from '../components/profile/LikedPosts'
import UserProfile from '../components/profile/UserProfile'
import ViewHistories from '../components/profile/ViewHistories'

const Profile = () => { 
  const { user } = useAuth()
  const title = `${user?.first_name} ${user?.last_name}`

  const [
    activeTab, 
    setActiveTab
  ] = useState<'Likes' | 'Subscribes' | 'Histories'>('Likes')

  return (
    <Stack gap={0}>
      <PageNavTab title={title}/>
      <UserProfile/>
      <ProfileTabs onChange={setActiveTab}/>
      {(activeTab === 'Histories') && <ViewHistories/>}
      {(activeTab === 'Likes') && <LikedPosts/>}
      {(activeTab === 'Subscribes') && <Subscriptions/>}
    </Stack>
  )
}

export default Profile