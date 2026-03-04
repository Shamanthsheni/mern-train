import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Log from "./pages/Log"
import Reg from "./pages/Reg"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/login" element={<Log />} />
        <Route path="/register" element={<Reg />} />
      </Routes>
    </>
  )
}

export default App
