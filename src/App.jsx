import React, { useState } from 'react'
import { Ideas, Blank } from './pages'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Ideas />} />
      <Route path="/Work" element={<Blank />} />
      <Route path="/About" element={<Blank />} />
      <Route path="/Services" element={<Blank />} />
      <Route path="/Ideas" element={<Ideas />} />
      <Route path="/Careers" element={<Blank />} />
      <Route path="/Contact" element={<Blank />} />
    </Routes>
  )
}

export default App
