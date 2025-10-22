import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import CountryDetails from './pages/CountryDetails'
import Navbar from './components/Navbar'
import { CssBaseline } from '@mui/material'

function NoMatch() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>404</h1>
      <p>No routes matched location</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
