import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <Box component="main" sx={{ p: 3, flex: 1, overflow: 'auto',  background: "#f5f8f84b"}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
