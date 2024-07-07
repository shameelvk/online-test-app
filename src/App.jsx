import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Test from './pages/Test/Test'
import Navbar from './components/NavBar/NavBar'

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/test" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App