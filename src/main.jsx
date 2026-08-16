import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { FinancialProvider } from './context/FinancialContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FinancialProvider>
          <App />
        </FinancialProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
