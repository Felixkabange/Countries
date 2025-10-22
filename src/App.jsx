import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Outlet renders the current route Home  */}
      <Outlet />
    </>
  )
}