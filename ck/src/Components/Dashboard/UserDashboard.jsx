import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaUserMd } from 'react-icons/fa';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('slotBooking');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define API URL once
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  // Fetch available slots or therapists when date or tab changes
  useEffect(() => {
    if (activeTab === 'slotBooking') {
      fetchAvailableSlots();
    } else if (activeTab === 'availableTherapists') {
      fetchAvailableTherapists();
    }
  }, [activeTab, selectedDate]);

  // Fetch available slots function
  const fetchAvailableSlots = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await axios.get(`${apiUrl}/slots/available/${formattedDate}`);
      
      // Sort slots by time to maintain consistent order
      const sortedSlots = response.data.sort((a, b) => {
        const timeA = new Date(`2024-01-01 ${a.time.split(' - ')[0]}`);
        const timeB = new Date(`2024-01-01 ${b.time.split(' - ')[0]}`);
        return timeA - timeB;
      });
      
      setAvailableSlots(sortedSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  // Fetch available therapists function
  const fetchAvailableTherapists = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await axios.get(`${apiUrl}/therapists/available/${formattedDate}`);
      setAvailableTherapists(response.data);
    } catch (error) {
      console.error('Error fetching available therapists:', error);
    }
  };

  // Book a slot function
  const bookSlot = async (slotId) => {
    try {
      await axios.post(`${apiUrl}/bookings`, { 
        slotId, 
        date: selectedDate.toISOString().split('T')[0] 
      });
      
      // Immediately refresh available slots after booking
      fetchAvailableSlots();
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="p-5">
          <h2 className="text-2xl font-semibold text-[#301934] mb-5">Dashboard</h2>
          <ul>
            <li 
              className={`mb-2 p-2 rounded cursor-pointer transition-colors duration-200 ${activeTab === 'slotBooking' ? 'bg-teal-100 text-[#301934]' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('slotBooking')}
            >
              Slot Booking
            </li>
            <li 
              className={`mb-2 p-2 rounded cursor-pointer transition-colors duration-200 ${activeTab === 'availableTherapists' ? 'bg-teal-100 text-[#301934]' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('availableTherapists')}
            >
              Available Therapists
            </li>
          </ul>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold mb-6 text-[#301934]">Welcome to Your Therapy Dashboard</h1>
          
          {activeTab === 'slotBooking' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#301934]">Available Slots</h2>
              
              <div className="mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  minDate={new Date()}
                  className="p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableSlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-teal-50 p-4 rounded-lg shadow cursor-pointer hover:bg-teal-100 transition-colors duration-200"
                    onClick={() => bookSlot(slot.id)}
                  >
                    {slot.time}
                  </motion.div>
                ))}
                {availableSlots.length === 0 && (
                  <p>No available slots for the selected date.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'availableTherapists' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#301934]">Available Therapists</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {availableTherapists.map((therapist) => (
                  <motion.div
                    key={therapist.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white p-4 rounded-lg shadow-md text-center"
                  >
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                      {therapist.photo ? (
                        <img 
                          src={`${apiUrl}${therapist.photo}`} 
                          alt={therapist.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><FaUserMd class="w-16 h-16 text-[#301934]" /></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <FaUserMd className="w-16 h-16 text-[#301934]" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#301934]">{therapist.name}</h3>
                    <p className={`mt-2 ${therapist.is_available ? 'text-green-500' : 'text-red-500'}`}>
                      {therapist.is_available ? 'Available' : 'Unavailable'}
                    </p>
                  </motion.div>
                ))}
                {availableTherapists.length === 0 && (
                  <p>No available therapists at the moment.</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;