import React from "react";
import GenerativeAIIcon from "C:/Vizion_Chatbot/my-project/src/assets/Generative AI.png"; // Adjust the path if necessary
import ResponsiveAIIcon from "C:/Vizion_Chatbot/my-project/src/assets/Responsive AI.png";
import ScalableAIIcon from "C:/Vizion_Chatbot/my-project/src/assets/Scalable AI.png";

const FeaturesData = [
  {
    name: "Generative AI",
    icon: (
      <img src={GenerativeAIIcon} alt="Generative AI" className="w-16 h-16 group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Securely and sustainably drive innovation using Large Language Models, Vision Models, and Generative AI, ensuring ethical and responsible advancements.",
    aosDelay: "300",
  },
  {
    name: "Scalable AI",
    icon: (
      <img src={ScalableAIIcon} alt="Scalable AI" className="w-16 h-16 group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elitScalable AI solutions, expertly engineered to quickly and effectively deliver groundbreaking results, enhancing efficiency across diverse applications.",
    aosDelay: "500",
  },
  {
    name: "Responsible AI",
    icon: (
      <img src={ResponsiveAIIcon} alt="Responsive AI" className="w-16 h-16 group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "We develop and deploy AI solutions that maintain ethics, clarity, and reliability, ensuring transparent and trustworthy technology applications",
    aosDelay: "700",
  },
];

const Features = () => {
  return (
    <>
      <div className="container py-14 sm:min-h-[600px]">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl mb-12 text-black dark:text-white"
          >
            Our Ideas 
          </h1>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {FeaturesData.map((data, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-dark hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300"
              >
                <div className="grid place-items-center"> {data.icon}</div>
                <h1 className="text-2xl">{data.name}</h1>
                <p>{data.description}</p>
                <a
                  href={data.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
