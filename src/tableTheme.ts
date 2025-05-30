import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const custom = defineStyle({
  fontSize: 'md',
  px: 2,
  py: 2,
  h: '12',
})

const sizes = {
  custom: definePartsStyle({ 
    th: custom, td: custom, caption: custom 
  }),
}

export const tableTheme = defineMultiStyleConfig({ sizes })