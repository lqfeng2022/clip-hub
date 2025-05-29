import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const large = defineStyle({
  container: {
    width: '120px',
    height: '120px',
  },
  label: {
    fontSize: '7xl',
  },
})

const small = defineStyle({
  container: {
    width: '38px',
    height: '38px',
  },
  label: {
    fontSize: 'xl',
  },
})

const sizes = {
  large, small
}

export const avatarTheme = defineMultiStyleConfig({ sizes })