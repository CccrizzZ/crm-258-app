import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
