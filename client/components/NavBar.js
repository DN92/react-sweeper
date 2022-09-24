import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick}) => (
  <div>
    <h1>APP NAME</h1>
    <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/available">Available</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>

    </nav>
    <hr />
  </div>
)


export default Navbar
