import React from "react";
import AppStoreImg from "C:/Vizion_Chatbot/my-project/src/assets/website/app_store.png";
import PlayStoreImg from "C:/Vizion_Chatbot/my-project/src/assets/website/play_store.png";

const Appstore = () => {
  return (
    <>
      <div className="container py-10 sm:min-h-[400px] sm:grid sm:place-items-center">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1
            data-aos="fade-up"
            className="text-2xl text-center sm:text-4xl font-semibold text-black dark:text-white"
          >
            Get Started with our app
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center sm:px-20 text-black dark:text-white"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            magnam harum accusantium odit?
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a href="#" data-aos="fade-up" data-aos-delay="500">
              <img
                src={AppStoreImg}
                alt=""
                className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
              />
            </a>
            <a href="#" data-aos="fade-up" data-aos-delay="700">
              <img
                src={PlayStoreImg}
                alt=""
                className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appstore;