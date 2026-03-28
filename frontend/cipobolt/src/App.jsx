import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout";
import Home from "./pages/Home";
import UjMarka from "./pages/UjMarka";
import UjCipo from "./pages/UjCipo";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ujmarka" element={<UjMarka />} />
        <Route path="/ujcipo" element={<UjCipo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;