import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ handleClick }) {
  return (
    <div>
      <h1>APP NAME</h1>
      <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/available">Available</Link>
          <a href="/placeholder">
            Logout
          </a>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
