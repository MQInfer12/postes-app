import { HashRouter, Routes, Route } from "react-router-dom"
import Map from "./pages/map"
import './index.css'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </HashRouter>
  )
}

export default App