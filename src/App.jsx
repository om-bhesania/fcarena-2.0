import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Nav from "./components/navbar/navbar";
import About from "./pages/About";
import Booking from "./pages/Booking"; 
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/*" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
