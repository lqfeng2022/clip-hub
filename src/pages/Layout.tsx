import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box } from '@chakra-ui/react'

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