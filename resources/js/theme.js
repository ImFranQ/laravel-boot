import { extendTheme } from "@chakra-ui/react"

export const primaryColor = '#FA824C'
export const secondaryColor = '#114B5F'

export default extendTheme({
  colors: {
    light: 'gray.200',
    dark: 'gray.900',
    muted: 'gray.500',
    secondary: {
      50: '#e2e9ec',
      100: '#b8c9cf',
      200: '#88a5af',
      300: '#58818f',
      400: '#356677',
      500: secondaryColor,
      600: '#0f4457',
      700: '#0c3b4d',
      800: '#0a3343',
      900: '#052332',
    },
    primary: {
      50: '#fef0ea',
      100: '#fedac9',
      200: '#fdc1a6',
      300: '#fca882',
      400: '#fb9567',
      500: primaryColor,
      600: '#f97a45',
      700: '#f96f3c',
      800: '#f86533',
      900: '#f65224',
    }
  },
  defaultProps: {
    colorScheme: 'primary',
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.50'
      }
    })
  }
})