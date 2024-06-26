import React from "react";
import Aiptabout from "../../assets/Aiptabout.png";
import Aiptabout2 from "../../assets/Aiptabout2.png";
import { BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import './Banner.css'; // Ensure this path is correct based on your project structure

const Banner = () => {
  const handleSeeDemo = () => {
    window.location.href = "https://www.youtube.com/watch?v=I-EIVlHvHRM";
  };

  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* image section */}
          <div data-aos="fade-up" data-aos-once="false" className="relative">
            <img src={Aiptabout} alt="Aiptabout" className="responsive-image" />
            <img src={Aiptabout2} alt="Aiptabout2" className="overlay-image" />
          </div>
          {/* text content section */}
          <div className="lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold text-black dark:text-white"
              >
                ABOUT US{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Our mission is to accelerate the development of AI
                </span>
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="500"
                className="text-black dark:text-white"
              >
                A forward-thinking tech firm focused on developing and implementing Artificial Intelligence solutions across multiple domains.
                We offers sophisticated Generative AI Language and Vision solutions, assisting companies in refining processes, boosting productivity, 
                and improving client interactions. Our proficiency spans from text analytics, predictive analytics and image recognition to forecasting analysis.


              </p>
              <ul className="custom-bullet-list text-black dark:text-white">
                <li data-aos="fade-up" data-aos-delay="600">
                  <BiCheckCircle className="bullet-icon" />
                  Develop custom AI solutions.
                </li>
                <li data-aos="fade-up" data-aos-delay="700">
                  <BiCheckCircle className="bullet-icon" />
                  Implement AI technologies.
                </li>
                <li data-aos="fade-up" data-aos-delay="800">
                  <BiCheckCircle className="bullet-icon" />
                  Provide AI consulting services.
                </li>
                <li data-aos="fade-up" data-aos-delay="900">
                  <BiCheckCircle className="bullet-icon" />
                  Offer AI training and education.
                </li>
              </ul>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="1000"
                  className="primary-btn text-black dark:text-white"
                >
                  Get Started
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="1000"
                  onClick={handleSeeDemo}
                  className="flex items-center gap-2 text-black dark:text-white"
                >
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>
            {/* background color blob */}
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
