import { HStack, Show, Stack, Box } from '@chakra-ui/react'
import ClipLogo from './ClipLogo'
import UserAvatarDrawer from './UserAvatarDrawer'
import LanguageBadge from './LanguageBadge'

const NavBar = () => {
  return (
    <Show below='md'>
      <Stack p='16px'>
        <HStack
          display='grid'
          gridTemplateColumns='1fr auto 1fr'
          alignItems='center'
        >
          <UserAvatarDrawer />
          <Box position='relative' display='inline-block'>
            <ClipLogo />
            <LanguageBadge />
          </Box>
        </HStack>
      </Stack>
    </Show>
  )
}

export default NavBar