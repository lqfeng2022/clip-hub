import { createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import ClipDetailPage from './pages/ClipDetailPage'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import ProfileUserDetail from './pages/ProfileUserDetail'
import ExpressionPage from './pages/ExpressionPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'clips/:slug', element: <ClipDetailPage/> },
      { path: 'expression', element: <ExpressionPage/> },
      { path: 'profile', element: <ProfilePage/> },
      { path: 'profile/me', element: <ProfileUserDetail/> },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
    ],
  },
])

export default router