import CollectionTabs from '@/components/CollectionTabs'
import PageNavTab from '@/components/PageNavTab'
import SavedPlaylistPage from '@/components/SavedPlaylistPage'
import YourCollections from '@/components/YourCollections'
import profilePagesData from '@/data/profilePagesData'
import useLanguageStore from '@/stores/languageStore'
import { useState } from 'react'

const CollectionPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.lists : profilePagesData.zh.lists

    const [activeTab, setActiveTab] = useState<'Collections' | 'Playlists'>('Collections')

  return (
    <>
      <PageNavTab title={header}/>
      <CollectionTabs onChange={setActiveTab}/>
      {(activeTab === 'Collections') && <YourCollections />}
      {(activeTab === 'Playlists') && <SavedPlaylistPage />}
    </>
  )
}

export default CollectionPage