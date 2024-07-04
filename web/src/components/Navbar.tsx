import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) => (
      `text-white flex items-center justify-center transition duration-300 ease-in-out transform rounded-full pl-20 py-1 pr-4 mr-16 ${location.pathname === path ? 'opacity-100 bg-light-green' : 'hover:scale-110 bg-transparent'}`
  );

  return (
      <nav className="bg-transparent h-screen p-6 flex flex-col justify-between items-center border-r border-gray-200 max-w-[100px]">
        <img src={logo} className="w-16 h-16" />
        <ul className="flex flex-col space-y-12 mb-12">
          <li>
            <Link to="/" className={linkClasses('/')}>
              <OtherHousesOutlinedIcon style={{ width: '3rem', height: '3rem', color: 'black', opacity: '1' }} />
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={linkClasses('/dashboard')}>
              <DashboardOutlinedIcon style={{ width: '3rem', height: '3rem', color: 'black', opacity: '1' }} />
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClasses('/about')}>
              <LibraryBooksOutlinedIcon style={{ width: '3rem', height: '3rem', color: 'black', opacity: '1' }} />
            </Link>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;
