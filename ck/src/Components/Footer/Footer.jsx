import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  // Define navigation items with targets
  const footerNavItems = [
    { name: "Services", target: "services-section" },
    { name: "Testimonials", target: "client-section" },
    { name: "About Us", target: "about-us" }
  ];

  const handleNavClick = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#301934] text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          {/* Logo Section */}
          <div className="flex items-center">
            <div onClick={() => handleNavClick('home')} className="cursor-pointer">
              <img src={logo} alt="Logo" className="h-14" />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-semibold mb-2">Menu</h2>
            <ul className="space-y-2 text-sm">
              {footerNavItems.map((item, index) => (
                <li key={index}>
                  <span
                    onClick={() => handleNavClick(item.target)}
                    className="cursor-pointer hover:underline"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
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
              <FaLinkedin className="text-[#0077B5] text-2xl" />
            </a>
            <a href="https://www.instagram.com/communikonnect_slt/?igshid=MjEwN2IyYWYwYw%3D%3D" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#E1306C] text-2xl" />
            </a>
            <a href="https://www.youtube.com/@Chandralekha-CommuniKonnect" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-[#FF0000] text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-center text-sm text-white py-2 mt-4">
        Copyright © 2024 communikonnect.com - Designed and Developed by <a href="https://webeetech.co.in/"> WeBeeTech </a>
      </div>
    </footer>
  );
};

export default Footer;