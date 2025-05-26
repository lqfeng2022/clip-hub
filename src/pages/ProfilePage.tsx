import { Box, Grid, GridItem, Show } from '@chakra-ui/react'
import ProfileList from '../components/ProfileList'
import ProfileHistory from '../components/ProfileHistory'
import ProfileUser from '../components/ProfileUser'

const Profile = () => {
  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        lg: `'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <ProfileList/>
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box>
          <ProfileUser/>
          <ProfileHistory/>
        </Box>
      </GridItem> 
    </Grid>
  )
}

export default Profile