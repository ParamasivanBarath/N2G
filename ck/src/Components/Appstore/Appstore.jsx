import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Appstore = () => {
  const [openSection, setOpenSection] = useState('');

  const faqData = {
    'PART A: A Pocket Guide to parents and caregivers on Speech Language Pathology': {
      questions: [
        {
          question: 'What is Speech Language Pathology (SLP)?',
          answer: 'Speech-Language pathology is a healthcare field that focuses on difficulties related to speech, language, social communication, cognitive communication, and swallowing in children and adults.'
        },
        {
          question: 'Who is a Speech Language Pathologist (SLPs)?',
          answer: 'A Speech-Language Pathologist is a healthcare professional who specializes in evaluating and treating communication disorders and swallowing difficulties.'
        },
        {
          question: 'Is there any other name for Speech Language Pathologists?',
          answer: 'Yes, Speech Language Pathologists are also known as Speech Therapists or Speech and Language Therapists.'
        },
        {
          question: 'How to find a qualified and certified speech therapist?',
          answer: 'Look for therapists with proper certification from recognized institutions and check their credentials and experience in the field.'
        }
      ]
    },
    'PART B: What to know about assessment and therapy?': {
      subtitle: 'Assessment:',
      questions: [
        {
          question: 'Is it mandatory to do speech and language assessment or can we directly start with speech therapy?',
          answer: 'Yes, assessment is mandatory before starting therapy to understand the specific needs and create an appropriate treatment plan.'
        },
        {
          question: 'How long does it take to assess a child/ client?',
          answer: 'Assessment typically takes 45-60 minutes, depending on the individual case.'
        },
        {
          question: 'Will the assessment session be extended to more than one day?',
          answer: 'Sometimes assessment may require multiple sessions depending on the complexity of the case.'
        },
        {
          question: 'Does the client or child need to be available during the assessment?',
          answer: 'Yes, the client/child must be present during the assessment for accurate evaluation.'
        }
      ]
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div id="faq-section" className="min-h-screen bg-[#301934] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FBBF24] text-center mb-12">
          Frequently Asked Questions
        </h1>

        {Object.entries(faqData).map(([section, data]) => (
          <div key={section} className="mb-8">
            <h2 className="text-2xl font-semibold text-[#FBBF24] mb-6">
              {section}
            </h2>
            {data.subtitle && (
              <h3 className="text-xl font-semibold text-[#FBBF24] mb-4">
                {data.subtitle}
              </h3>
            )}
            <div className="space-y-4">
              {data.questions.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#FBBF24]/20 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(`${section}-${index}`)}
                    className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-[#4a2751] transition-colors duration-200"
                  >
                    <span className="flex-1 pr-4">{item.question}</span>
                    {openSection === `${section}-${index}` ? (
                      <FaMinus className="text-[#FBBF24] flex-shrink-0" />
                    ) : (
                      <FaPlus className="text-[#FBBF24] flex-shrink-0" />
                    )}
                  </button>
                  {openSection === `${section}-${index}` && (
                    <div className="p-4 bg-[#2d1932] text-white">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appstore;