import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store'; // <--- Store import qilindi
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './providers/theme-provider'
import { BrowserRouter } from 'react-router-dom'

// GitHub Pages yoki boshqa hostinglar uchun redirect mantiqi
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  window.history.replaceState(null, null, redirect.replace(window.location.origin, ""));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <BrowserRouter basename="/mirodil">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)