import { createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import ClipDetailPage from './pages/ClipDetailPage'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'clips/:slug', element: <ClipDetailPage/> },
      { path: 'profile', element: <Profile/> },
    ],
  },
])

export default router