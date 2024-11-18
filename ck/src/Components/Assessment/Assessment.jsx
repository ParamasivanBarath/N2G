import React, { useState } from "react";
import backgroundImage from "../../assets/your-image.jpg"; // Update this path with your actual image path

const Assessment = () => {
  const [currentField, setCurrentField] = useState(0);
  const [formData, setFormData] = useState({
    patientName: "",
    dob: "",
    email: "",
    caregiverNameRelation: "",
    caregiverContactNumber: "",
    complaintDetails: "",
  });

  // Initialize submissionMessage as an empty string
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = [
    { label: "Patient/Child's Name", name: "patientName", type: "text", required: true },
    { label: "Date of Birth of Patient/Child", name: "dob", type: "date", required: true },
    { label: "E-mail ID", name: "email", type: "email", required: true },
    { label: "Primary Caregiver Name and Relation (e.g., Rani - Mother)", name: "caregiverNameRelation", type: "text", required: true },
    { label: "Caregiver Contact Number", name: "caregiverContactNumber", type: "tel" },
    { label: "Patient/Child's Complaint in Detail", name: "complaintDetails", type: "textarea" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentField === fields.length - 1) {
      console.log('Submitting formData:', formData);
  
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  
      // Updated endpoint to match backend route
      fetch(`${apiUrl}/patients/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Changed to json() since backend sends JSON
      })
      .then(data => {
        console.log('Success:', data);
        setSubmissionMessage(data.message || "Your form has been submitted successfully!");     
        setShowPopup(true);
      
      setTimeout(() => {
        setShowPopup(false);
        setCurrentField(0);
        setFormData({
          patientName: "",
          dob: "",
          email: "",
          caregiverNameRelation: "",
          caregiverContactNumber: "",
          complaintDetails: "",
        });
      }, 3000);
    })
    .catch(error => {
      console.error('Error:', error);
      setSubmissionMessage("An error occurred. Please try again.");
      setShowPopup(true);
    });
  } else if (currentField < fields.length - 1) {
    setCurrentField(currentField + 1);
  }
};

  const handlePrevious = () => {
    if (currentField > 0) {
      setCurrentField(currentField - 1);
    }
  };

  // Check if the current field is valid
  const isFieldValid = () => {
    const field = fields[currentField];

    // Check for empty fields
    if (field.required && !formData[field.name]) {
      return false;
    }

    // Validate Email
    if (field.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(formData.email);
    }

    // For select fields, check if a valid option is selected
    if (field.type === 'select') {
      return formData[field.name] !== "";
    }

    // For other fields, check if they are not empty
    return formData[field.name].trim() !== "";
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage:`url(${backgroundImage})` }} 
    >
      <div className="bg-[#301934] text-[#FFDF00] p-6 rounded-3xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Patient Details - CommuniKonnect</h1>
        <form>
          <div className="mb-4">
            <label className="block text-lg">{fields[currentField].label}</label>
            {fields[currentField].type === 'textarea' ? (
              <textarea
                name={fields[currentField].name}
                value={formData[fields[currentField].name]}
                onChange={handleChange}
                className="border border-[#FFDF00] rounded p-2 w-full text-black"
              />
            ) : (
              <input
                type={fields[currentField].type}
                name={fields[currentField].name}
                value={formData[fields[currentField].name]}
                onChange={handleChange}
                className="border border-[#FFDF00] rounded p-2 w-full text-black placeholder-black"
                placeholder={`Enter ${fields[currentField].label.toLowerCase()}`}
              />
            )}
          </div>

          <div className="flex justify-between mt-4">
            {currentField > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-600 text-white rounded px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-700 w-full mr-2"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!isFieldValid()}
              className={`bg-[#FFDF00] text-white rounded px-4 py-2 transition duration-300 ease-in-out hover:bg-yellow-600 w-full ${!isFieldValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {currentField === fields.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>

        {/* Popup Message */}
        {showPopup && (
          <div 
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
              {/* Render submission message */}
              <p>{submissionMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;