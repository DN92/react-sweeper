import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick}) => (
  <div>
    <h1>APP NAME</h1>
    <nav>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/availible">Available</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      {/* : */}
      {/* <div> */}
      {/* The navbar will show these links before you log in */}
      {/* <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      </div> */}

    </nav>
    <hr />
  </div>
)


export default Navbar
