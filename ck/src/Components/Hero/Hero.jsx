import React from "react";
import Slider_1 from "../../assets/Slider_1.png";
import { BiPlayCircle } from "react-icons/bi";
import './Hero.css'; // Ensure this path is correct based on your project structure

const Hero = () => {
  const handleSeeDemo = () => {
    window.location.href = "https://youtube.com/@chandralekha-communikonnect?si=_NDDQnMFsf_fLhrN";
  };

  return (
    <>
      <div className="py-12 sm:py-0 bg-[#301934] dark:bg-black dark:text-white duration-300 overflow-hidden"> {/* Set background color to dark purple */}
        <div className="container min-h-[700px] flex relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
            {/* hero text section */}
            <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
              <h1 data-aos="fade-up" className="text-4xl font-semibold text-white"> {/* Set text color to white */}
              Breaking Silence &

              Building Konnections

              From The Comfort of Your Home{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Online Speech and Language - Assessment & Intervention
                </span>
              </h1>
              
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="primary-btn text-white"
                >
                  Get Started
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  onClick={handleSeeDemo}
                  className="flex items-center gap-2 text-white"
                >
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>
            {/* image section */}
            <div data-aos="fade-up" data-aos-offset="0" className="order-1 sm:order-2 relative">
              <img src={Slider_1} alt="Aipt" className="responsive-image" />
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