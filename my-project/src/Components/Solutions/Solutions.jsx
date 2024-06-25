import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Solutions.css'; // Ensure this path is correct based on your project structure

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
          <a href="/custom-llm">
            <h2>Custom LLM</h2>
            <p>We specialize in creating LLMs tailored to specific industry requirements.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="400">
          <a href="/custom-vision">
            <h2>Custom Vision</h2>
            <p>Expertise lies in the development of solutions for image-related tasks.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="600" >
          <a href="/llmops">
            <h2>LLMOps</h2>
            <p>Our proficiency lies in the deployment of LLMs utilizing cloud tech.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="800">
          <a href="/ai-products">
            <h2>AI Products</h2>
            <p>Creating AI solutions using Generative AI that address industry challenges.</p>
          </a>
        </div>
        <div className="solution-item" data-aos="fade-up" data-aos-delay="1000">
          <a href="/ai-educator">
            <h2>AI Educator</h2>
            <p>Educating individuals on how to effectively integrate GenAI in their work.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
