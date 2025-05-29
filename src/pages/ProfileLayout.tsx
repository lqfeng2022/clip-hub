import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ProfileList from '../components/profile/ProfileList';

const ProfileLayout = () => {
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
          <ProfileList />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Outlet /> {/* shared main content wrapper */}
      </GridItem>
    </Grid>
  );
};

export default ProfileLayout;