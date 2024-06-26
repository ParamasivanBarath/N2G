import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Solutions.css'; // Ensure this path is correct based on your project structure
import { FaBrain, FaCamera, FaCloud, FaRobot, FaChalkboardTeacher } from 'react-icons/fa'; // Importing some icons

const Solutions = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="solutions-container">
      <h1 className="solutions-title" data-aos="fade-up">Our Solutions</h1>
      <div className="solutions-list">
        <div className="solution-item" data-aos="fade-up" data-aos-delay="200">
          <a href="/custom-llm" className="solution-link">
            <FaBrain className="solution-icon" />
            <h2 className="solution-heading">Custom LLM</h2>
            <p className="solution-description">We specialize in creating LLMs tailored to specific industry requirements.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="400">
          <a href="/custom-vision" className="solution-link">
            <FaCamera className="solution-icon" />
            <h2 className="solution-heading">Custom Vision</h2>
            <p className="solution-description">Expertise lies in the development of solutions for image-related tasks.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="600">
          <a href="/llmops" className="solution-link">
            <FaCloud className="solution-icon" />
            <h2 className="solution-heading">LLMOps</h2>
            <p className="solution-description">Our proficiency lies in the deployment of LLMs utilizing cloud tech.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="800">
          <a href="/ai-products" className="solution-link">
            <FaRobot className="solution-icon" />
            <h2 className="solution-heading">AI Products</h2>
            <p className="solution-description">Creating AI solutions using Generative AI that address industry challenges.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="1000">
          <a href="/ai-educator" className="solution-link">
            <FaChalkboardTeacher className="solution-icon" />
            <h2 className="solution-heading">AI Educator</h2>
            <p className="solution-description">Educating individuals on how to effectively integrate GenAI in their work.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
