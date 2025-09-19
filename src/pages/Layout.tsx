import { Box } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import ScrollToTop from '@/components/ScrollToTop'

const Layout = () => {
  const location = useLocation()

  const hideNavRoutes = ['/user/signin', '/user/signup']
  const shouldHideNav = hideNavRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNav && <NavBar/>}
      <Box>
        <ScrollToTop/>
        <Outlet/>
      </Box>
    </>
  )
}

export default Layout