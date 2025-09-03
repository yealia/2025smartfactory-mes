import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import QualityControl from "./pages/QualityControl"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/qualityControl" element={<QualityControl />} />
        {/* 다른 페이지도 여기 추가 */}
      </Routes>
    </Router>
  )
}

export default App
