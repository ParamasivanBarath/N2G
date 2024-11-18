import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AdminSlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/slots/${formattedDate}`);
      
      const sortedSlots = response.data.sort((a, b) => {
        const timeA = new Date(`2024-01-01 ${a.time.split(' - ')[0]}`);
        const timeB = new Date(`2024-01-01 ${b.time.split(' - ')[0]}`);
        return timeA - timeB;
      });
      
      setSlots(sortedSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSlotAvailability = async (slotId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await axios.put(`${apiUrl}/slots/${slotId}/toggle`);
      
      if (response.status === 200) {
        fetchSlots();
      } else {
        console.error('Failed to toggle slot availability');
      }
    } catch (error) {
      console.error('Error toggling slot availability:', error);
      if (error.response?.status === 404) {
        alert('Slot not found. Please refresh the page.');
      } else {
        alert('Failed to update slot availability. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#301934]">
      {/* Added a container with top padding for navbar space */}
      <div className="container mx-auto pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 shadow-lg" // Increased padding
        >
          <h2 className="text-3xl font-bold mb-8 text-[#FFDF00] text-center">
            Slot Management
          </h2>
          
          {/* Date Picker Container */}
          <div className="mb-8 flex justify-center"> {/* Added flex and justify-center */}
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              minDate={new Date()}
              className="p-3 border bg-white text-[#301934] w-full max-w-md text-center" // Added max-width and center text
            />
          </div>
          
          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center">
              <p className="text-[#FFDF00] text-lg">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {slots.map((slot) => (
                <motion.div 
                  key={slot.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 border bg-white shadow-md" // Increased padding
                >
                  <p className="text-[#301934] font-semibold mb-4 text-lg text-center">
                    {slot.time}
                  </p>
                  <button
                    onClick={() => toggleSlotAvailability(slot.id)}
                    className={`w-full py-2 px-4 text-sm font-medium transition-colors duration-300 border ${
                      slot.is_available 
                        ? 'bg-[#FFDF00] hover:bg-[#e5c800] text-[#301934]'
                        : 'bg-[#301934] hover:bg-[#200f24] text-white'
                    }`}
                    style={{ borderColor: '#FFDF00' }}
                  >
                    {slot.is_available ? 'Lock Slot' : 'Unlock Slot'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSlotManagement;