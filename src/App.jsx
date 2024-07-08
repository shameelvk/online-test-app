import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Test from './pages/Test/Test'
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Result from './pages/Result/Result'

function App() {
  const location = useLocation();
  return (
    <div>
      {(location.pathname === "/test" || location.pathname === "/result") && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {(location.pathname === "/test" || location.pathname === "/result") && <Footer />}
    </div>
  )
}

export default App