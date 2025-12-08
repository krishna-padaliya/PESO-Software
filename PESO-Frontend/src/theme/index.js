import { createTheme } from '@mui/material/styles'


export const getDesignTokens = (mode) => ({
palette: {
mode,
...(mode === 'light'
? {
primary: { main: '#1976d2' },
secondary: { main: '#ff9800' },
background: { default: '#f4f6f8', paper: '#fff' },
}
: {
primary: { main: '#90caf9' },
secondary: { main: '#ffb74d' },
background: { default: '#121212', paper: '#1d1d1d' },
}),
},
})


export const getTheme = (mode) => createTheme(getDesignTokens(mode))