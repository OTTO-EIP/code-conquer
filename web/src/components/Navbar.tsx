import React from 'react';
import { Link } from 'react-router-dom';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent h-screen p-6 flex flex-col justify-start items-center">
      <ul className="flex flex-col space-y-12">
        <li>
          <img src={logo} className="w-16 h-16 mb-14" />
        </li>
        <li>
          <Link to="/" className="text-white flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110">
            <OtherHousesRoundedIcon style={{ width: '3rem', height: '3rem' }} />
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110">
            <DashboardRoundedIcon style={{ width: '3rem', height: '3rem' }} />
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110">
            <LibraryBooksRoundedIcon  style={{ width: '3rem', height: '3rem' }} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
