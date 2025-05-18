import { Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import ClipGrid from './components/ClipGrid'

function App() {
  return (
    <Grid
      templateAreas={{
        base: `'nav' 'main'`,
        lg: `'nav nav' 'aside main'`,
      }}>
      <GridItem area='nav'>
        <NavBar/>
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside' bg='gold'>Aside</GridItem>
      </Show>
      <GridItem area='main'>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default App
