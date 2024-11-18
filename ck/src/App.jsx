import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Banner from './Components/Banner/Banner';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import PopupPlayer from './Components/PopupPlayer/PopupPlayer';
import Quotes from './Components/Quotes/Quotes';
import Appstore from './Components/Appstore/Appstore';
import Solutions from './Components/Solutions/Solutions';
import Assessment from './Components/Assessment/Assessment';
import AdminPanelLogin from './Components/AdminPanel/AdminPanelLogin';
import AdminDashboard from './Components/AdminPanel/AdminDashboard';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import UserDashboard from './Components/Dashboard/UserDashboard';
import Testimonials from './Components/Testimonials/Testimonials';

// Import the new modules
import AdminSlotManagement from './Components/AdminPanel/AdminSlotManagement';
import AdminTherapistManagement from './Components/AdminPanel/AdminTherapistManagement';

import AOS from "aos";
import "aos/dist/aos.css";

const AllComponents = ({ togglePlay }) => (
  <div className="flex flex-col">
    <div className="w-full">
      <Hero />
    </div>
    <div className="w-full">
      <Banner togglePlay={togglePlay} />
    </div>
    <div className="w-full">
      <Features />
    </div>
    <div className="w-full">
      <Solutions togglePlay={togglePlay}/>
    </div>
    <div className="w-full">
      <Quotes />
    </div>
    <div className="w-full">
      <Appstore />
    </div>
    <div className="w-full">
      <Footer />
    </div>
  </div>
);


const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = () => setIsPlay(!isPlay);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const location = useLocation();

  return (
    <main className="overflow-x-hidden bg-white dark:bg-black px-0 mx-0">
      <Navbar />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<AllComponents togglePlay={togglePlay} />} />
        
        {/* Add Testimonials Route */}
        <Route path="/testimonials" element={<Testimonials />} />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminPanelLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* New Admin Management Routes */}
        <Route path="/admin-slot-management" element={<AdminSlotManagement />} />
        <Route path="/admin-therapist-management" element={<AdminTherapistManagement />} />
        
        {/* Assessment route */}
        <Route path="/assessment" element={<Assessment />} />
        
        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
      {location.pathname === '/' && <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />}
    </main>
  );
};

export default App;