import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    phonenumber: '', // Ensure this matches what your backend expects
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.phonenumber.trim()) { // Changed to match backend expectation
      errors.phonenumber = 'Phone number is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
  
    if (validateForm()) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  
        // Updated endpoint to match backend route
        const response = await axios.post(`${apiUrl}/users/signin`, {
          phonenumber: formData.phonenumber,
          password: formData.password,
        });
  
        if (response.data.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
          navigate('/dashboard');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setServerError(error.response.data.error || 'Invalid credentials.');
        } else if (error.response && error.response.status === 500) {
          setServerError('Server error. Please try again later.');
        } else {
          setServerError('An unknown error occurred.');
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-teal-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">Sign In</h2>
        {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="tel"
              name="phonenumber" // Changed to match backend expectation
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={formData.phonenumber} // Changed to match backend expectation
              onChange={handleChange}
            />
            {errors.phonenumber && <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;