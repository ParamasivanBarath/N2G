import React from 'react';
import './Brands.css';
import OpenAI from "../../assets/OpenAI.png";
import MistralAI from "../../assets/MistralAI.png";
import HuggingFace from "../../assets/Huggingface.png";
import Pinecone from "../../assets/Pinecone.png";
import Gemini from "../../assets/Gemini.png";
import Bard from "../../assets/Bard.png";

const brands = [
  { name: "Open AI", image: OpenAI },
  { name: "Mistral AI", image: MistralAI },
  { name: "Pinecone", image: Pinecone },
  { name: "Huggingface", image: HuggingFace },
  { name: "Bard", image: Bard },
  { name: "Gemini", image: Gemini },
];

const Brands = () => {
  return (
   
     <div className=" brands-container">
      <div className="brands-scroller ">
        {brands.map((brand, index) => (
          <div key={index} className="brand-item ">
            <img src={brand.image} alt={brand.name} className="brand-image" />
          </div>
        ))}
      </div>
     </div>
    
  );
};

export default Brands;
