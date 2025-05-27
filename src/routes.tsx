import { createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import ClipDetailPage from './pages/ClipDetailPage'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'clips/:slug', element: <ClipDetailPage/> },
      { path: 'profile', element: <ProfilePage/> },
      { path: 'user/signin', element: <SigninPage/> },
      { path: 'user/signup', element: <SignupPage/> },
    ],
  },
])

export default router