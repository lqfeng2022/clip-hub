import { createBrowserRouter } from 'react-router-dom'
import ClipDetailPage from './pages/ClipDetailPage'
import ErrorPage from './pages/ErrorPage'
import ExpressionPage from './pages/ExpressionPage'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import ProfileLayout from './pages/ProfileLayout'
import ProfilePage from './pages/ProfilePage'
import ProfileUser from './pages/ProfileUser'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import ProfileExpressions from './pages/ProfileExpressions'
import ProfileHistories from './pages/ProfileHistories'
import ProfileLikes from './pages/ProfileLikes'
import ProfileBookmarks from './pages/ProfileBookmarks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'clips/:slug', element: <ClipDetailPage/> },
      { path: 'expression', element: <ExpressionPage/> },
      { 
        path: 'profile', 
        element: <ProfileLayout/>,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'me', element: <ProfileUser /> },
          { path: 'expression', element: <ProfileExpressions /> },
          { path: 'history', element: <ProfileHistories /> },
          { path: 'like', element: <ProfileLikes /> },
          { path: 'bookmark', element: <ProfileBookmarks /> },
        ],
      },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
    ]
  }
])

export default router