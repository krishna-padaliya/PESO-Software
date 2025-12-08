import React from 'react'
import { Typography, Box } from '@mui/material'

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant="h4" fontWeight={700}>
        🎉 Dashboard Loaded Successfully!
      </Typography>
    </Box>
  )
}
