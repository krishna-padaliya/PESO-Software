import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import App from './App'
import { store } from './store'
import CustomThemeProvider from './theme/ThemeProvider'



createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Provider store={store}>
<CustomThemeProvider>
<SnackbarProvider maxSnack={3}>
<BrowserRouter>
<App />
</BrowserRouter>
</SnackbarProvider>
</CustomThemeProvider>
</Provider>
</React.StrictMode>
)