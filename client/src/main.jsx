import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './conText/StoreContext.jsx'
import LanguageProvider from './i18n/LanguageProvider.jsx'
import { ThemeProvider } from './conText/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
)
