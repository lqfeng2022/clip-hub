import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import ProfileEditPage from './pages/ProfileEditPage'
import SigninPage from './pages/SigninPage'
import PostDetailPage from './pages/PostDetailPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import CollectionPage from './pages/CollectionPage'
import SignupPage from './pages/SignupPage'
import ProfileChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import LanguageSettingPage from './pages/LanguagePage'
import BookmarkPage from './pages/BookmarkPage'
import SearchPage from './pages/SearchPage'
import HostDetailPage from './pages/HostDetailPage'
import Layout from './Layout'
import ChatDetailPage from './pages/ChatDetailPage'
import NotificationPage from './pages/NotificationPage'
import PremiumPage from './pages/PremiumPage'
import PremiumPaymentPage from './pages/PremiumPaymentPage'
import HostsPage from './pages/HostsPage'
import Playground from './Playground'
import PlaylistDetailPage from './pages/PlaylistDetailPage'
import CourseDetailPage from './pages/CourseDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'search', element: <SearchPage/> },
      { path: 'notifications', element: <NotificationPage/> },
      { path: 'products/:id', element: <PostDetailPage/> },
      { path: 'premium', element: <PremiumPage/> }, 
      { path: 'premium/payment', element: <PremiumPaymentPage/> },
      { path: 'hosts', element: <HostsPage/> },
      { path: 'host/:hostSlug', element: <HostDetailPage/> },
      { path: 'languages', element: <LanguageSettingPage/> },
      { path: 'profile', element: <ProfilePage/> },
      { path: 'profile/me', element: <ProfileEditPage/> },
      { path: 'chat', element: <ProfileChatPage/> },
      { path: 'chat/:id', element: <ChatDetailPage/> },
      { path: 'bookmark', element: <BookmarkPage/> },
      { path: 'collection', element: <CollectionPage/> },
      { path: 'collection/:slug', element: <CollectionDetailPage/> },
      { path: 'courses/:slug', element: <CourseDetailPage/> }, 
      { path: 'playlist/:slug', element: <PlaylistDetailPage/> },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
      { path: 'playground', element: <Playground/> },
    ]
  }
])

export default router