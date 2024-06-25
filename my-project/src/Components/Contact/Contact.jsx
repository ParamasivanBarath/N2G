import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css'; // Ensure this path is correct based on your project structure
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  const handleLocationClick = () => {
    window.open("https://www.google.com/maps?q=Sliver+Steak,+Mangalore,+Karnataka+575006", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@n2ginnovate.com,contact@n2ginnovate.com";
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title" data-aos="fade-up">Contact Us</h1>
      <h2 className="contact-subtitle" data-aos="fade-up" data-aos-delay="200">Contact us for any Information</h2>
      <div className="contact-list">
        <div className="contact-item" data-aos="fade-up" data-aos-delay="400" onClick={handleLocationClick}>
          <FaMapMarkerAlt className="contact-icon" />
          <h3 className="contact-item-title">Location</h3>
          <p>Sliver Steak, Mangalore, Karnataka 575006</p>
        </div>
        <div className="contact-item" data-aos="fade-up" data-aos-delay="600" onClick={handleEmailClick}>
          <FaEnvelope className="contact-icon" />
          <h3 className="contact-item-title">Email</h3>
          <p>support@n2ginnovate.com</p>
          <p>contact@n2ginnovate.com</p>
        </div>
        <div className="contact-item" data-aos="fade-up" data-aos-delay="800">
          <FaPhone className="contact-icon" />
          <h3 className="contact-item-title">Phone</h3>
          <p>Phone: +91-9886078205</p>
          <p>+91-973974497033</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
