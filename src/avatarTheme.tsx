import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const middle = defineStyle({
  container: {
    width: '40px',
    height: '40px',
  },
  label: {
    fontSize: 'xl',
  },
})

const small = defineStyle({
  container: {
    width: '30px',
    height: '30px',
  },
  label: {
    fontSize: 'lg',
  },
})

const sizes = {
  middle, small
}

export const avatarTheme = defineMultiStyleConfig({ sizes })