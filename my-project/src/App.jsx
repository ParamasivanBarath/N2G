import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Banner from './Components/Banner/Banner';
import Banner2 from './Components/Banner/Banner2';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import PopupPlayer from './Components/PopupPlayer/PopupPlayer';
import Quotes from './Components/Quotes/Quotes';
import Appstore from './Components/Appstore/Appstore';
import Brands from './Components/Brands/Brands';
import Solutions from './Components/Solutions/Solutions';
import Contact from './Components/Contact/Contact';

import AOS from "aos";
import "aos/dist/aos.css";

const AllComponents = ({ togglePlay }) => (
  <div className="space-y-20">
    <div className="w-full p-0 m-0">
      <Hero />
    </div>
    <div className="w-full p-0 m-0">
      <Banner togglePlay={togglePlay} />
    </div>
    <div className="w-full p-0 m-0">
      <Features />
    </div>
    <div className="w-full p-0 m-0">
      <Solutions togglePlay={togglePlay}/>
    </div>
    <div className="w-full p-0 m-0">
      <Quotes />
    </div>
    <div className="w-full p-0 m-0">
      <Brands />
    </div>
    <div className="w-full p-0 m-0">
      <Appstore />
    </div>
    <div className="w-full p-0 m-0">
      <Footer />
    </div>
  </div>
);

const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = () => setIsPlay(!isPlay);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const location = useLocation();

  return (
    <main className="overflow-x-hidden bg-white dark:bg-black px-0 mx-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllComponents togglePlay={togglePlay} />} />
        <Route path="/home" element={<><Hero togglePlay={togglePlay} /><Footer /></>} />
        <Route path="/about" element={<><Banner /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/features" element={<><Features /><Footer /></>} />
        <Route path="/solutions" element={<><Solutions togglePlay={togglePlay} /><Footer /></>} />
        <Route path="/quotes" element={<><Quotes /><Footer /></>} />
        <Route path="/banner2" element={<><Banner2 /><Footer /></>} />
        <Route path="/brands" element={<><Brands /><Footer /></>} />
        <Route path="/appstore" element={<><Appstore /><Footer /></>} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
      {location.pathname === '/' && <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />}
    </main>
  );
};

export default App;
