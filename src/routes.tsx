import { createBrowserRouter } from 'react-router-dom'
import ClipDetailPage from './pages/ClipDetailPage'
import ErrorPage from './pages/ErrorPage'
import ExpressionPage from './pages/ExpressionPage'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import ProfileLayout from './pages/ProfileLayout'
import ProfilePage from './pages/ProfilePage'
import ProfileUserPage from './pages/ProfileUserPage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import ProfileHistoryPage from './pages/ProfileHistoryPage'
import ProfileLikePage from './pages/ProfileLikePage'
import ExpressionDetailPage from './pages/ExpressionDetailPage'
import ProfileEpbookPage from './pages/ProfileEpbookPage'
import ProfilePlaylistPage from './pages/ProfilePlaylistPage'
import ProfilePlaylistDetailPage from './pages/ProfilePlaylistDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'clips/:slug', element: <ClipDetailPage/> },
      { path: 'expressions', element: <ExpressionPage/> },
      { path: 'expressions/:slug', element: <ExpressionDetailPage/> },
      { 
        path: 'profile', 
        element: <ProfileLayout/>,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'me', element: <ProfileUserPage /> },
          { path: 'expression', element: <ProfileEpbookPage /> },
          { path: 'history', element: <ProfileHistoryPage /> },
          { path: 'like', element: <ProfileLikePage /> },
          { path: 'playlist', element: <ProfilePlaylistPage /> },
          { path: 'playlist/:slug', element: <ProfilePlaylistDetailPage /> },
        ],
      },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
    ]
  }
])

export default router