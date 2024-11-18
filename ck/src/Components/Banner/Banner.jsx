import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import './Banner.css';
import OnlineImage from "../../assets/online-therapy.png";  // Replace with the correct image path

const Banner = () => {
  return (
    <div id="about-us" className="py-12 sm:py-0 bg-[#301934] dark:bg-black dark:text-white duration-300 overflow-hidden">
      <div className="container flex items-center justify-center min-h-[620px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Image section */}
          <div data-aos="fade-up" data-aos-once="false" className="relative">
            <img
              src={OnlineImage}
              alt="Online Therapy Illustration"
              className="responsive-image"
            />
          </div>

          {/* Text content section */}
          <div className="lg:pr-20">
            <div className="relative space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold text-[#FBBF24]"
              >
                About Us
              </h1>
              <h2
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-3xl font-semibold text-white"
              >
                Why Online?
              </h2>
              <ul className="space-y-4 text-lg text-white">
                <li data-aos="fade-up" data-aos-delay="400" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Connect from the comfort of your home
                </li>
                <li data-aos="fade-up" data-aos-delay="500" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Access from anywhere around the globe
                </li>
                <li data-aos="fade-up" data-aos-delay="600" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  No worries on distance, time, and travel cost
                </li>
                <li data-aos="fade-up" data-aos-delay="700" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Fix your sessions at your comfortable time zone
                </li>
                <li data-aos="fade-up" data-aos-delay="800" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Increases consistency and regularity in therapy
                </li>
                <li data-aos="fade-up" data-aos-delay="900" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Monitoring clients' progress collaboratively
                </li>
                <li data-aos="fade-up" data-aos-delay="1000" className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#FBBF24]" />
                  Improved Privacy during sessions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;