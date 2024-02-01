import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import WebFont from 'webfontloader';
import { useEffect } from "react";
import Nav from "./components/navbar/Navbar";
import './fonts/Chromate-Regular.otf'
import Footer from './components/footer/Footer';
import Timings from "./pages/Timings";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import ContactUs from './pages/ContactUs';

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
          <Route path="/*" element={<Home />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/timings" element={<Timings />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes component={Dashboard} />} />
        </Routes>
        <Footer />
          {/* <Route path="/404" element={<Error404 />} /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
