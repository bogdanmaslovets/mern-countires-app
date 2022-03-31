import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1350,
      xl: 1536,
    },
  },
  palette: {
    secondary: {
      main: '#ff1744',
    },
  },
})
