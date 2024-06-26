import React from "react";
import Aipt from "../../assets/Aipt.png";
import Aiptslider1 from "../../assets/Aipt-slider1.png";
import Aiptslider2 from "../../assets/Aipt-slider2.png";
import Aiptslider3 from "../../assets/Aipt-slider3.png";
import { BiPlayCircle } from "react-icons/bi";
import './Hero.css'; // Ensure this path is correct based on your project structure

const Hero = () => {
  const handleSeeDemo = () => {
    window.location.href = "https://www.youtube.com/watch?v=I-EIVlHvHRM";
  };

  return (
    <>
      <div className="py-12 sm:py-0 dark:bg-black dark:text-white duration-300 overflow-hidden">
        <div className="container min-h-[700px] flex relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
            {/* hero text section */}
            <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
              <h1 data-aos="fade-up" className="text-4xl font-semibold">
                INTO THE FUTURE{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Big Ideas Ready AI
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="300">
                Nex2GenAI: Discover where innovative GenAI solutions converge with real-world applications.
                Transform your strategy with our AI-powered approaches, customized for a variety of domains.
              </p>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="primary-btn"
                >
                  Get Started
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  onClick={handleSeeDemo}
                  className="flex items-center gap-2"
                >
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>
            {/* image section */}
            <div data-aos="fade-up" data-aos-offset="0" className="order-1 sm:order-2 relative">
              <img src={Aipt} alt="Aipt" className="responsive-image" />
              <img src={Aiptslider1} alt="Slider1" className="slider-image slider-image-top" />
              <img src={Aiptslider2} alt="Slider2" className="slider-image slider-image-bottom-left" />
              <img src={Aiptslider3} alt="Slider3" className="slider-image slider-image-bottom-right" />
            </div>
          </div>

          {/* Animated Blob */}
          <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
