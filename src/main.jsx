import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './providers/theme-provider'
import { BrowserRouter } from 'react-router-dom'

if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  history.replaceState(null, null, redirect.replace(
    location.origin,
    ""
  ));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <BrowserRouter basename="/mirodil">
      <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)