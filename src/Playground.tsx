import ScrollToTop from '@/components/ScrollToTop'
import NavList from '@/components/NavList'
import { Box, Container, Grid, GridItem, Show } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import RightContent from './components/RightContent'
import useNavStack from './stores/navStack'
import { useEffect } from 'react'
import NavBar from './components/NavBar'

const Layout = () => {
  const location = useLocation()
  const push = useNavStack((s) => s.push)

  useEffect(() => {
    push(location.pathname)
  }, [location.pathname])

  return (
    <Container maxW='1400px' px={0}>
      <ScrollToTop/>
      <Grid
        templateAreas={{
          base: `'main'`,
          md: `'aside main'`,
          // lg: `'aside main right'`,
        }}
        templateColumns={{
          base: `1fr`,
          md: `auto 1fr`,
          // lg: `auto minmax(0, 666px) 1fr`,
        }}
        columnGap={{ base: 0, lg: 2 }}
      >
        <Show above='md'>
          <GridItem area='aside' position='sticky' top='0' h='100vh'>
            <NavList />
          </GridItem>
        </Show>
        <GridItem 
          area='main' 
          display='flex' 
          justifyContent='center'
        >
          <Box 
            mx='auto' maxW='1150px' width='100%' 
          >
            <NavBar/>
            <Outlet /> {/* shared main content wrapper */}
          </Box>
        </GridItem>
        {/* Right for searches
        <Show above='lg'>
          <GridItem 
            area='right' 
            position='sticky' 
            display='flex'
            top='0' 
            h='100vh'
          >
            <Box mt={5} flex='1' overflowY='auto' px={4}>
              <RightContent/>
            </Box>
          </GridItem>
        </Show> */}
      </Grid>
    </Container>
  )
}

export default Layout