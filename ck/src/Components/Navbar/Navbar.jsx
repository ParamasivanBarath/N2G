import React, { useState } from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll for smooth scrolling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import user icon
import logo from "../../assets/logo.png"; // Replace with your actual logo path
import { useNavigate } from "react-router-dom"; // For navigation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define navigation items with their scroll targets
  const navItems = [
    { name: "Home", target: "/" },
    { name: "Service", target: "services-section" },
    { name: "FAQ", target: "faq-section" },
    { name: "About", target: "about-us" }
  ];

  // Handle Book a Slot button click
  const handleBookSlot = () => {
    navigate("/assessment"); // Redirect to assessment module
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#301934",
        padding: "0.5rem 1rem", // Reduced padding to minimize height
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="nav-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="nav-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="h-10" /> {/* Reduced logo size */}
          </a>
        </div>

        {/* Full screen menu - Visible on large screens */}
        <ul className="nav-menu hidden sm:flex" style={{ listStyleType: "none", display: "flex", gap: "1.5rem" }}> {/* Reduced gap */}
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.target}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="cursor-pointer"
                style={{
                  color: "#fbbf24",
                  textDecoration: "none",
                  fontSize: "1rem", // Slightly reduced font size
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")} // Hover effect
                onMouseLeave={(e) => (e.target.style.color = "#fbbf24")}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* Book a Slot Button */}
          <li>
            <button
              onClick={handleBookSlot}
              style={{
                backgroundColor: "#fbbf24",
                color: "#301934",
                padding: "0.3rem 0.8rem", // Reduced padding for button
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#fff")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fbbf24")}
            >
              Book a Slot
            </button>
          </li>
        </ul>

        {/* User Icon for Sign-In */}
        <div className="user-icon sm:flex hidden ml-auto">
          {/* Only visible on larger screens */}
          <a href="/signin" style={{ color: "#fbbf24", textDecoration: "none" }}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </a>
        </div>

        {/* Burger Menu Icon - Only visible on small screens */}
        <div className="nav-burger sm:hidden" onClick={toggleMenu} style={{ cursor:'pointer' }}>
          {/* Burger lines */}
          <div className={`burger-line ${isOpen ? 'open' : ''}`} style={{ width:'25px', height:'3px', backgroundColor:'#fbbf24', margin:'4px', transition:'all 0.3s ease' }}></div>
          <div className={`burger-line ${isOpen ? 'open' : ''}`} style={{ width:'25px', height:'3px', backgroundColor:'#fbbf24', margin:'4px', transition:'all 0.3s ease' }}></div>
          <div className={`burger-line ${isOpen ? 'open' : ''}`} style={{ width:'25px', height:'3px', backgroundColor:'#fbbf24', margin:'4px', transition:'all 0.3s ease' }}></div>
        </div>

        {/* Mobile Menu - Only visible when burger menu is clicked */}
        <ul className={`nav-menu-mobile ${isOpen ? 'active' : ''}`} style={{
          display:isOpen ? 'flex' : 'none',
          flexDirection:'column',
          position:'absolute',
          top:'60px',
          right:'0',
          backgroundColor:'#301934',
          width:'100%',
          padding:'1rem'
         }}>
           {navItems.map((item) => (
             <li key={item.name}>
               <Link 
                 to={item.target} 
                 smooth={true} 
                 duration={500} 
                 onClick={toggleMenu}
                 style={{
                   color:'#fbbf24',
                   fontSize:"1.2rem",
                   textDecoration:"none"
                 }}
               >
                 {item.name}
               </Link>
             </li>
           ))}
           {/* User Icon in Mobile Menu */}
           <li>
             <a href="/signin" onClick={toggleMenu} style={{color:"#fbbf24"}}>
               Sign In
             </a>
           </li>
         </ul>
       </div>
     </nav>
   );
};

export default Navbar;