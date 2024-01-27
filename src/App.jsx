import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
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
import Swiper from 'swiper'; 
import  { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Chromate Serif']
      }
    });
  }, []);
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes component={Dashboard} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
