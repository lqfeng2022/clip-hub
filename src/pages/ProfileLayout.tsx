import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ProfileListLink from '../components/profile/ProfileListLink';

const ProfileLayout = () => {
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
        <GridItem area='aside' px={2.5}>
          <ProfileListLink />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Outlet /> {/* shared main content wrapper */}
      </GridItem>
    </Grid>
  );
};

export default ProfileLayout;