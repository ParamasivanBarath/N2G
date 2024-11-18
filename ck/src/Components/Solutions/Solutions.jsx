import React from 'react';

const Solutions = () => {
  const services = {
    assessment: {
      title: "Assessment",
      details: "1 to 1.5 hrs session (online/in-person, formal structured approach)",
      description: "Detailed analysis and interpretation of client speech and language skills/ social interaction/ cognitive communication/ reading and writing skills/ swallowing- to rule out what the client needs further (eg: Intervention/ other professionals' role)",
      note: "Assessment report will be provided to the family members"
    },
    intervention: {
      title: "Intervention",
      details: "45 min tele (online)/therapy session",
      description: "Evidence based therapy approaches and Person Centered care to improve client's communication skill and quality of life",
      note: "Every therapy session will be documented and will be provided to the family members"
    }
  };

  const conditions = {
    children: {
      ageRange: "(<18 years)",
      conditions: [
        "Delayed language development (ASD/ADHD)",
        "Speech Sound Disorder (misarticulation)",
        "Stuttering",
        "Voice disorder",
        "Apraxia",
        "Reading and writing difficulty",
        "Social Communication Disorder",
        "Feeding and swallowing difficulty"
      ]
    },
    adults: {
      ageRange: "(>18 years)",
      conditions: [
        "Stuttering",
        "Voice disorders",
        "Aphasia",
        "Speech sound disorder",
        "Dysarthria",
        "Apraxia",
        "Swallowing difficulty"
      ]
    }
  };

  return (
    <div id="services-section" className="min-h-screen bg-[#301934] text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FBBF24] text-center mb-12">
          Our Services
        </h1>

        {/* Services Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {Object.values(services).map((service, index) => (
            <div key={index} className="border border-[#FBBF24] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#FBBF24] mb-4">
                {service.title}
              </h2>
              <p className="text-sm mb-4">{service.details}</p>
              <p className="mb-4">{service.description}</p>
              <p className="text-sm italic text-[#FBBF24]">{service.note}</p>
            </div>
          ))}
        </div>

        {/* Services Offered Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-8">Services offered for</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(conditions).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <div className="border-2 border-[#FBBF24] rounded-full px-8 py-3 mb-4">
                  <h3 className="text-xl font-semibold capitalize">
                    {key} <span className="text-sm">{value.ageRange}</span>
                  </h3>
                </div>
                
                <div className="border border-[#FBBF24] rounded-lg p-6 w-full">
                  <ul className="space-y-2 text-left">
                    {value.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-[#FBBF24] rounded-full mr-3"></span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
     
  );
};

export default Solutions;