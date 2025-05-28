import { Box, Grid, GridItem, Show } from '@chakra-ui/react'
import ProfileList from '../components/profile/ProfileList'
import ProfileHistory from '../components/profile/ProfileHistory'
import ProfileUser from '../components/profile/ProfileUser'

const Profile = () => {  
  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        lg: `'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' pl={2.5}>
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