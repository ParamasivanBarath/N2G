import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
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
      content: "Chandralekha is great in analyzing the requirement and do appropriate training. Very patient, skillful and engaged in progressive results. Highly recommended.",
      author: "Mr. Karthik",
      details: "S/o Mala, 65y/F"
    },
    // Add other testimonials here
  ];

  return (
    <div className="min-h-screen bg-[#301934] py-16 px-4 md:px-8">
      <br/><br/>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
          What Our Patients Says
        </h1>
        
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#301934] rounded-lg p-8 shadow-xl border border-[#FBBF24]/20"
            >
              <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                {testimonial.content}
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className="text-[#FBBF24] w-6 h-6 mx-1"
                    />
                  ))}
                </div>
                <h3 className="text-[#FBBF24] font-semibold text-lg mb-1">
                  {testimonial.author}
                </h3>
                <p className="text-gray-300 italic">
                  {testimonial.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;