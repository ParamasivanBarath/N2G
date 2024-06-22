import React, { useEffect, useState } from 'react'
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
  },[]);
  return(
    <main className="overflow-x-hidden bg-white dark:bg-black">
    <Navbar />
    <Hero togglePlay={togglePlay}/>
    <Features />
    <Quotes />
    <Banner togglePlay={togglePlay}/>
    <Banner2 togglePlay={togglePlay}/>
    <Banner togglePlay={togglePlay}/>
    <Banner2 togglePlay={togglePlay}/>
    <Brands togglePlay={togglePlay}/>
    <Appstore />
    <Footer />

    {/* Video Player */}
    <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
  </main>
  );
}; 

export default App