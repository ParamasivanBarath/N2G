import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaUserMd } from 'react-icons/fa';

// TherapistDetailsModal Component
const TherapistDetailsModal = ({ therapist, onClose }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      // Updated to use appointments route
      const response = await axios.get(`${apiUrl}/appointments/therapist/${therapist.id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      // Updated to use appointments route
      await axios.delete(`${apiUrl}/appointments/${appointmentId}`);
      alert('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Error cancelling appointment');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">{therapist.name} - Appointments</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.allotted_slot}</td>
                <td>
                  <button onClick={() => cancelAppointment(appointment.id)} className="bg-red-500 text-white p-2 rounded">
                    Cancel Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Main AdminTherapistManagement Component
const AdminTherapistManagement = () => {
  const [therapists, setTherapists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [newTherapistData, setNewTherapistData] = useState({
    name: '',
    title: '',
    photo: null
  });
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTherapists();
    fetchAvailablePatients();
    fetchAvailableSlotsForTodayOrSelectedDate();
    fetchAvailableTherapistsForDate();
  }, [selectedDate]);

  const fetchTherapists = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/therapists`);
      if (Array.isArray(response.data)) {
        setTherapists(response.data);
      } else {
        console.error('Expected an array of therapists but got:', response.data);
        setTherapists([]);
      }
    } catch (error) {
      console.error('Error fetching therapists:', error);
      setTherapists([]);
    }
  };

  const fetchAvailablePatients = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/patients/available`);
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching available patients:', error);
      setPatients([]);
    }
  };

  const fetchAvailableSlotsForTodayOrSelectedDate = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/slots/available/${formattedDate}`);
      setAvailableSlots(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    }
  };

  const fetchAvailableTherapistsForDate = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/therapists/available/${formattedDate}`);
      setAvailableTherapists(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching available therapists:', error);
      setAvailableTherapists([]);
    }
  };

  const handleInputChange = (e) => {
    setNewTherapistData({
      ...newTherapistData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setNewTherapistData({
      ...newTherapistData,
      photo: e.target.files[0]
    });
  };

  const addNewTherapist = async () => {
    if (!newTherapistData.name.trim() || !newTherapistData.title.trim()) {
      alert("Name and Title are required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newTherapistData.name.trim());
      formData.append("title", newTherapistData.title.trim());
      
      if (newTherapistData.photo) {
        formData.append("photo", newTherapistData.photo);
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      await axios.post(`${apiUrl}/therapists`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setNewTherapistData({ name: '', title: '', photo: null });
      fetchTherapists();
    } catch (error) {
      console.error('Error adding therapist:', error);
    }
  };

  const deleteTherapist = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      await axios.delete(`${apiUrl}/therapists/${id}`);
      fetchTherapists();
    } catch (error) {
      console.error('Error deleting therapist:', error);
    }
  };

  const toggleTherapistAvailability = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      await axios.put(`${apiUrl}/therapists/${id}/toggle`);
      fetchTherapists();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const allocatePatientToSlot = async () => {
    if (!selectedPatientId || !selectedSlotId || !selectedTherapistId) {
      alert("Please select all required fields");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      await axios.post(`${apiUrl}/appointments`, {
        slotId: selectedSlotId,
        patientId: selectedPatientId,
        therapistId: selectedTherapistId,
        date: selectedDate.toISOString().split('T')[0]
      });

      alert("Patient allocated successfully!");
      fetchAvailableSlotsForTodayOrSelectedDate();
      fetchAvailableTherapistsForDate();
    } catch (error) {
      console.error('Error allocating patient to slot:', error);
      alert("Failed to allocate patient. Please try again.");
    }
  };

  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#301934] pt-20">
      <div className="container mx-auto px-4"></div>
      <h2 className="text-3xl font-bold mb-6 text-[#FFDF00] text-center">Manage Therapists</h2>

      {/* Add New Therapist Form */}
      <div className="mb-8 p-4 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Add New Therapist</h3>
        <input
          type="text"
          name="name"
          placeholder="Name (required)"
          value={newTherapistData.name}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title (required)"
          value={newTherapistData.title}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="p-2 border rounded w-full mb-4"
        />
        <button
          onClick={addNewTherapist}
          className="bg-[#FFDF00] text-[#301934] p-2 rounded"
        >
          Add Therapist
        </button>
      </div>

      {/* Therapist List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.isArray(therapists) && therapists.length > 0 ? (
    therapists.map((therapist) => (
      <div
        key={therapist.id}
        className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleTherapistClick(therapist)}
      >
        <div className="mb-6 w-40 h-40 mx-auto overflow-hidden rounded-full border-4 border-[#301934]">
          {therapist.photo ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${therapist.photo.split('/uploads/')[1]}`}
              alt={therapist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Photo path:', therapist.photo);
                e.target.onerror = null;
                e.target.style.display = 'none';
                const iconContainer = document.createElement('div');
                iconContainer.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                iconContainer.innerHTML = `
                  <div class="text-[#301934]">
                    <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                  </div>
                `;
                e.target.parentElement.appendChild(iconContainer);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <FaUserMd className="w-20 h-20 text-[#301934]" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-[#301934] mb-2">{therapist.name}</h3>
        <p className="text-gray-600 mb-6">{therapist.title}</p>
        <div className="space-y-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTherapistAvailability(therapist.id);
            }}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-300 ${
              therapist.is_available
                ? 'bg-[#FFDF00] text-[#301934] hover:bg-[#FFE533]'
                : 'bg-[#301934] text-white hover:bg-[#452748]'
            }`}
          >
            {therapist.is_available ? 'Lock Therapist' : 'Unlock Therapist'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTherapist(therapist.id);
            }}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors duration-300"
          >
            Delete Therapist
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-3 text-center text-[#FFDF00] text-xl">
      No therapists available
    </div>
  )}
</div>
<div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
  <h3 className="text-2xl font-bold text-[#301934] mb-6">Allocate Patient to Therapist</h3>
  <div className="space-y-4">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="yyyy/MM/dd"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#301934]"
    />
    <select
      onChange={(e) => setSelectedPatientId(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#301934]"
    >
      <option value="">Select Patient</option>
      {Array.isArray(patients) && patients.map((patient) => (
        <option key={patient.id} value={patient.id}>
          {patient.patient_name}
        </option>
      ))}
    </select>
    <select
      onChange={(e) => setSelectedSlotId(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#301934]"
    >
      <option value="">Select Slot</option>
      {Array.isArray(availableSlots) && availableSlots.map((slot) => (
        <option key={slot.id} value={slot.id}>
          {slot.time}
        </option>
      ))}
    </select>
    <select
      onChange={(e) => setSelectedTherapistId(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#301934]"
    >
      <option value="">Select Therapist</option>
      {Array.isArray(availableTherapists) && availableTherapists.map((therapist) => (
        <option key={therapist.id} value={therapist.id}>
          {therapist.name}
        </option>
      ))}
    </select>
    <button
      onClick={allocatePatientToSlot}
      className="w-full bg-[#FFDF00] text-[#301934] p-3 rounded-md font-semibold hover:bg-[#FFE533] transition-colors duration-300"
    >
      Allocate Patient
    </button>
  </div>
</div>

{/* Therapist Details Modal */}
{isModalOpen && selectedTherapist && (
  <TherapistDetailsModal 
    therapist={selectedTherapist} 
    onClose={() => setIsModalOpen(false)} 
  />
)}
     </div>
  );
};

export default AdminTherapistManagement;