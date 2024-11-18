import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./Darkmode";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Solutions", link: "/solutions" },
  { id: 4, name: "Blogs", link: "https://06g.06e.myftpupload.com/blog/" },
  { id: 6, name: "News", link: "/News" },
  { id: 7, name: "Career", link: "/Career" },
  { id: 5, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="relative z-[9999] text-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  {link.startsWith("http") ? (
                    <a
                      href={link}
                      className="text-xl font-semibold hover:text-primary py-2 hover:border-b-2 hover:border-secondary transition-colors duration-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                    </a>
                  ) : (
                    <Link
                      to={link}
                      className="text-xl font-semibold hover:text-primary py-2 hover:border-b-2 hover:border-secondary transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <DarkMode />
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-8">
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                {link.startsWith("http") ? (
                  <a
                    href={link}
                    className="text-2xl font-semibold hover:text-primary transition-colors duration-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMenu}
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    to={link}
                    className="text-2xl font-semibold hover:text-primary transition-colors duration-500"
                    onClick={toggleMenu}
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
