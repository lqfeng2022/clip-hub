import {
  Button,
  Grid,
  GridItem,
  Heading,
  Show,
  Stack
} from '@chakra-ui/react'
import ProfileBackimage from '../components/profile/ProfileBackimage'
import ProfileForms from '../components/profile/ProfileForms'
import ProfileList from '../components/profile/ProfileList'
import ProfilePortrait from '../components/profile/ProfilePortrait'

const ProfileUserDetail = () => {
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
        <Stack px={2.5} maxW='800px'>
          <Heading py={4}>Profile Customization</Heading>
          <ProfileBackimage/>
          <ProfilePortrait/>
          <ProfileForms/>
        </Stack>
        <Button m='20px 10px 80px' size='md' fontSize='lg'>
          Publish
        </Button>
      </GridItem> 
    </Grid>
  )
}

export default ProfileUserDetail