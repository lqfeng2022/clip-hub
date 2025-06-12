import { Box } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
  const location = useLocation()

  const hideNavRoutes = ['/user/signin', '/user/signup']
  const shouldHideNav = hideNavRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNav && <NavBar/>}
      <Box>
        <Outlet/>
      </Box>
    </>
  )
}

export default Layout