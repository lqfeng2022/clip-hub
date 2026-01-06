import { HStack, Show, Stack } from '@chakra-ui/react'
import ClipLogo from './ClipLogo'
import LanguageTab from './LanguageTab'
import UserAvatarDrawer from './UserAvatarDrawer'

const NavBar = () => {
  return (
    <Show below='md'>
      <Stack p='16px'>
        <HStack justifyContent='space-between' alignItems='center'>
          <UserAvatarDrawer/>
          <ClipLogo/>
          <LanguageTab/>
        </HStack>
      </Stack>
    </Show>
  )
}

export default NavBar