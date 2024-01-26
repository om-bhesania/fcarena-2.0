import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import WebFont from 'webfontloader';
import { useEffect } from "react";
import Nav from "./components/navbar/Navbar";
import './fonts/Chromate-Regular.otf'
import Footer from './components/footer/Footer';
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Chromate Serif']
      }
    });
  }, []);

  return (
    <> 
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/*" element={<Home />} />
          </Routes>
          <Footer/>
        </BrowserRouter> 
    </>
  );
}

export default App;
