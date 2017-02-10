import React from 'react';
import './TopNav.scss';

const TopNav = () => (
  <header className='header'>
    <a href="/">
      <span className='logoText'>Skyscanner</span>
      <span className='logo' />
    </a>
		<button className='burger' />
  </header>
);

export default TopNav;
