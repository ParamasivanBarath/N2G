import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#301934] text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/">
              <img src={logo} alt="Logo" className="h-14" />
            </a>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-semibold mb-2">Menu</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="services-section" className="hover:underline">Services</a></li>
              <li><a href="/testimonials" className="hover:underline">Testimonials</a></li>
              <li><a href="about-us" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-[#FBBF24]" />
              <span>+91 936 1918 001</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <FaEnvelope className="text-[#FBBF24]" />
              <span>consultant@communikonnect.com</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/company/communikonnectslt/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-[#0077B5] text-2xl" /> {/* LinkedIn Blue */}
            </a>
            <a href="https://www.instagram.com/communikonnect_slt/?igshid=MjEwN2IyYWYwYw%3D%3D" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#E1306C] text-2xl" /> {/* Instagram Pink */}
            </a>
            <a href="https://www.youtube.com/@Chandralekha-CommuniKonnect" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-[#FF0000] text-2xl" /> {/* YouTube Red */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-center text-sm text-white py-2 mt-4">
        Copyright © 2024 communikonnect.com
      </div>
    </footer>
  );
};

export default Footer;
