import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../assets/home.png';
import aboutIcon from '../assets/about.png';
import dashboardIcon from '../assets/dashboard.png';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-custom-gradient p-10 flex justify-center border-b border-white">
      <ul className="flex space-x-7">
        <li>
          <Link to="/" className="text-white flex items-center transition duration-300 ease-in-out transform hover:scale-110">
            <img src={homeIcon} alt="Home Icon" className="h-10 w-10 mr-2" />
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white flex items-center transition duration-300 ease-in-out transform hover:scale-110">
            <img src={dashboardIcon} alt="Dashboard Icon" className="h-10 w-10 mr-2" />
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white flex items-center transition duration-300 ease-in-out transform hover:scale-110">
            <img src={aboutIcon} alt="About Icon" className="h-10 w-10 mr-2" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
