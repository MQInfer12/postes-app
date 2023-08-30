import { HashRouter, Routes, Route } from "react-router-dom"
import './index.css'
import Map from "./pages/map"
import AddFile from "./pages/addFile"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AddFile />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  )
}

export default App