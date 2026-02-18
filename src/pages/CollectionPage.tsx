import CollectionTabs from '@/components/CollectionTabs'
import PageNavTab from '@/components/PageNavTab'
import SavedPlaylistPage from '@/pages/SavedPlaylistPage'
import YourCollections from '@/components/YourCollections'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { useState } from 'react'
import SavedCoursePage from './SavedCoursePage'

type CollectionTab = 'Collections' | 'Playlists' | 'Courses'

const CollectionPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.lists : profilePagesData.zh.lists

  const [activeTab, setActiveTab] = useState<CollectionTab>('Collections')

  const renderContent = () => {
    switch (activeTab) {
      case 'Playlists':
        return <SavedPlaylistPage />
      case 'Courses':
        return <SavedCoursePage />
      case 'Collections':
      default:
        return <YourCollections />
    }
  }
    
  return (
    <>
      <PageNavTab title={header}/>
      <CollectionTabs onChange={setActiveTab}/>
      {renderContent()}
    </>
  )
}

export default CollectionPage