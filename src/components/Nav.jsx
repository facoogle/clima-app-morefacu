import React from 'react';
import SearchBar from './SearchBar.jsx';
import './Nav.css';
//importo Link
import { Link } from "react-router-dom"
//dentro del componente hago los linkeos necesarios.

function Nav({onSearch}) {
  return (
    <nav >
      
      <div className="navbar">
      <Link to='/'>
        <span className="brand">
          Home
        </span>
      </Link>
      <Link to='/about'>
        <span className='about'>Contact</span>
      </Link>
      </div>
        <SearchBar
          onSearch={onSearch}
        />
        
    </nav>
  );
};

export default Nav;