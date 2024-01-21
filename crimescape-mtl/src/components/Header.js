import React from 'react';
import Logo from '../assets/CrimeScape_logo.png';
const Header = () => (
  <header className='bg-blue-950 relative'>
    <p className='text-white text-center text-2xl font-semibold py-4 shadow-lg shadow-blue-600/60'>CrimeScape MTL</p>
    <div className='absolute inset-0 bg-gradient-to-r from-blue-600/30 via-transparent to-blue-600/30'></div>
  </header>
);

export default Header;