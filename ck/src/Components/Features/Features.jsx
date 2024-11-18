import React from "react";
import Slider from "react-slick";
import Typewriter from "react-typewriter-effect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    content: "I met Ms. Chandralekha speech therapist, at last December. My son is diagnosed with intellectual disability. I am giving speech therapy for my son from 2 1/2 years with several therapists. I never met such good therapist ever before. She is wonderful therapist and she is having a good patience. She is taking every classes with interest and she is monitoring how we are doing at home also. Ms Chandralekha gave me good counselling for my son's progress and future development. She gave me an open talk about his development and future. My son is getting better progress. I hope he will speak soon. Thank you Chandralekha madam. I am very thankful to Ms. Lakshmi madam psychologist, who referred you. Thank you once again",
    author: "Mr S. Sundararajan & Ms S. Kamakshi",
    details: "P/o Mukunth, 14y/M"
  },
  {
    content: "Chandralekha Mam is very clear on setting goals and achieving them, she tried different approaches in teaching him how to talk step by step. Results were great, we love her, i would definitely recommend Chandralekha mam, she knows what she is doing and very good at it.",
    author: "Ms. Sivarani",
    details: "M/o Varun Karthik, 8y/M"
  },
  {
    content: "Chandralekha Mam is very clear on setting goals and achieving them, she tried different approaches in teaching him how to talk step by step. Results were great, we love her, i would definitely recommend Chandralekha mam, she knows what she is doing and very good at it.",
    author: "Ms. Sivarani",
    details: "M/o Varun Karthik, 8y/M"
  },
  // Add all other testimonials similarly
];

const Features = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    fade: true
  };

  return (
    <div id="client-section" className="bg-[#301934] text-white py-16 px-8 text-center">
      <h2 className="text-4xl font-semibold text-[#FBBF24] mb-6">
        What Our Patients Says
      </h2>
      <div className="flex flex-col items-center mb-8">
        <Typewriter
          multiText={[ // Changed to multiText array
            "Here's what our client says 👉",
            "Read their experiences 👇",
            "Discover their stories ✨"
          ]}
          typeSpeed={100}
          startDelay={1000}
          multiTextDelay={1000}
          cursorColor="#FBBF24"
          multiTextLoop
        />
        <div className="flex justify-center mt-6">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="text-[#FBBF24] text-3xl mx-1" />
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto relative">
        <button 
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-[#FBBF24] transition-colors duration-300"
        >
          <FaArrowLeft className="text-3xl" />
        </button>
        <button 
          onClick={() => sliderRef.current.slickNext()}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-[#FBBF24] transition-colors duration-300"
        >
          <FaArrowRight className="text-3xl" />
        </button>
        <div className="px-10">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="outline-none">
                <div className="bg-[#301934] p-8 rounded-lg">
                  <p className="text-xl mb-6 leading-relaxed">{testimonial.content}</p>
                  <p className="font-semibold text-lg text-[#FBBF24]">{testimonial.author}</p>
                  <p className="text-md italic text-gray-300">{testimonial.details}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <button 
        onClick={() => window.location.href='/testimonials'} 
        className="px-6 py-3 text-xl font-semibold text-black bg-[#FBBF24] hover:bg-[#fffeff] hover:scale-110 transition-all duration-300 ease-in-out rounded-full mt-10 shadow-lg"
      >
        More Happy Clients
      </button>
    </div>
  );
};

export default Features;