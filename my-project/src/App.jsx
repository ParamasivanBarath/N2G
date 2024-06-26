import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  const [isPlay, setIsPlay] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <main className="overflow-x-hidden bg-white dark:bg-black">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Hero togglePlay={togglePlay} />}
          />
          <Route
            path="/Home"
            element={<Hero togglePlay={togglePlay} />}
          />
          <Route
            path="/About"
            element={<Banner />}
          />
          <Route
            path="/Contact"
            element={<Contact />}
          />
          <Route
            path="/Features"
            element={<Features />}
          />
          <Route
            path="/Solutions"
            element={<Solutions togglePlay={togglePlay} />}
          />
          <Route
            path="/Quotes"
            element={<Quotes />}
          />
          <Route
            path="/Banner2"
            element={<Banner2 />}
          />
          <Route
            path="/Brands"
            element={<Brands />}
          />
          <Route
            path="/Appstore"
            element={<Appstore />}
          />
          <Route
            path="/Footer"
            element={<Footer />}
          />
        </Routes>
        <div className="space-y-20 "> {/* Increase spacing and add padding */}
          <div className="container mx-auto">
            <Features />
          </div>
          <div className="container mx-auto">
            <Solutions togglePlay={togglePlay}/>
          </div>
          <div className="container mx-auto">
            <Quotes />
          </div>
          <div className="container mx-auto">
            <Banner2 togglePlay={togglePlay} />
          </div>
          <div className="container mx-auto">
            <Banner togglePlay={togglePlay} />
          </div>
          <div className="container mx-auto">
            <Banner2 togglePlay={togglePlay} />
          </div>
          <div className="container mx-auto">
            <Brands />
          </div>
          <div className="container mx-auto">
            <Appstore />
          </div>
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
        <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
      </main>
    </Router>
  );
};

export default App;
