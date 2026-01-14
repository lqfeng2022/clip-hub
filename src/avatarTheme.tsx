import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const small = defineStyle({
  container: {
    width: '30px',
    height: '30px',
  },
  label: {
    fontSize: 'lg',
  },
})

const middle = defineStyle({
  container: {
    width: '40px',
    height: '40px',
  },
  label: {
    fontSize: 'lg',
  },
})

const large = defineStyle({
  container: {
    width: '80px',
    height: '80px',
  },
  label: {
    fontSize: '4xl',
  },
})

const big = defineStyle({
  container: {
    width: '120px',
    height: '120px',
  },
  label: {
    fontSize: '5xl',
  },
})

const sizes = {
 small, middle, large, big
}

export const avatarTheme = defineMultiStyleConfig({ sizes })