import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const large = defineStyle({
  container: {
    width: '122px',
    height: '122px',
  },
  label: {
    fontSize: '7xl',
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
  large, small
}

export const avatarTheme = defineMultiStyleConfig({ sizes })