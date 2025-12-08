import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from './index'


const ThemeContext = createContext()


export function useThemeContext() {
return useContext(ThemeContext)
}


export default function CustomThemeProvider({ children }) {
const [mode, setMode] = useState('light')
const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))


const theme = useMemo(() => getTheme(mode), [mode])


return (
<ThemeContext.Provider value={{ mode, toggleColorMode }}>
<MuiThemeProvider theme={theme}>
<CssBaseline />
{children}
</MuiThemeProvider>
</ThemeContext.Provider>
)
}

