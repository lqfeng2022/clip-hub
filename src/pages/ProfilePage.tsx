import { Box, Grid, GridItem, Show, Image } from '@chakra-ui/react'
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
        lg: '170px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <ProfileList/>
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box p={2}>
          <Box
            height='160px'
            borderRadius={5}
            overflow='hidden'
            bg='gray.500'
          >
            <Image src='https://bit.ly/naruto-sage'/>
          </Box>
          <ProfileUser/>
          <ProfileHistory/>
        </Box>
      </GridItem> 
    </Grid>
  )
}

export default Profile