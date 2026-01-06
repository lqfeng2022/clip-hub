import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import ProfileEditPage from './pages/ProfileEditPage'
import SigninPage from './pages/SigninPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfileListDetailPage from './pages/ProfileListDetailPage'
import ProfileListsPage from './pages/ProfileListsPage'
import SignupPage from './pages/SignupPage'
import ProfileChatPage from './pages/ProfileChatPage'
import HomePage from './pages/HomePage'
import LanguageSettingPage from './pages/LanguageSettingPage'
import ProfileBookmarkPage from './pages/ProfileBookmarkPage'
import SearchPage from './pages/SearchPage'
import HostDetailPage from './pages/HostDetailPage'
import Layout from './Layout'
import ChatDetailPage from './pages/ChatDetailPage'
import NotificationPage from './pages/NotificationPage'
import BeBroPage from './pages/BeBroPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'search', element: <SearchPage/> },
      { path: 'notifications', element: <NotificationPage/> },
      { path: 'products/:id', element: <ProductDetailPage/> },
      { path: 'host/:hostSlug', element: <HostDetailPage/> },
      { path: 'bebro', element: <BeBroPage/> },
      { path: 'languages', element: <LanguageSettingPage/> },
      { 
        path: 'profile', 
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'me', element: <ProfileEditPage /> },
          { path: 'chat', element: <ProfileChatPage/> },
          { path: 'chat/:id', element: <ChatDetailPage/> },
          { path: 'bookmark', element: <ProfileBookmarkPage/> },
          { path: 'collection', element: <ProfileListsPage /> },
          { path: 'collection/:slug', element: <ProfileListDetailPage /> },
        ],
      },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
    ]
  }
])

export default router