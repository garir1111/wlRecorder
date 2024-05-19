import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Box from '@mui/material/Box'
import App from './App'

const rootStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Box sx={rootStyle}>
      <App />
    </Box>
  </React.StrictMode>
)
