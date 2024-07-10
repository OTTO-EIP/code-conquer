import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
// import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.png';

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) => (
      `text-white flex items-center justify-center transition-all duration-300 ease-in-out rounded-full p-1 ${location.pathname === path ? 'opacity-100 bg-green' : 'hover:scale-110 bg-transparent'}`
  );

  return (
      <nav className="bg-transparent p-6 flex justify-between items-center border-b border-gray-200">
        <img src={logo} className="w-12 h-12" alt="LOGO"/>
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className={linkClasses('/')}>
              {/*<OtherHousesOutlinedIcon style={{width: '2rem', height: '2rem', color: 'white', opacity: '1'}}/>*/}
              <span className="text-white">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={linkClasses('/dashboard')}>
              {/*<DashboardOutlinedIcon style={{width: '2rem', height: '2rem', color: 'white', opacity: '1'}}/>*/}
              <span className="text-white">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={linkClasses('/leaderboard')}>
              {/*<LeaderboardOutlinedIcon style={{width: '2rem', height: '2rem', color: 'white', opacity: '1'}}/>*/}
              <span className="text-white">Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClasses('/about')}>
              {/*<LibraryBooksOutlinedIcon style={{width: '2rem', height: '2rem', color: 'white', opacity: '1'}}/>*/}
              <span className="text-white">Documentation</span>
            </Link>
          </li>
        </ul>
        <img src={avatar} className="w-12 h-12" alt="LOGO"/>
      </nav>
  );
};

export default Navbar;
