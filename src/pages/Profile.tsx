import { Grid, GridItem, Show } from '@chakra-ui/react'
import ProfileList from '../components/ProfileList'

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
        main
      </GridItem> 
    </Grid>
  )
}

export default Profile