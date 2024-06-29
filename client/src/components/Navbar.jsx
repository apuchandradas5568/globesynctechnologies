import React from 'react';
import { Link } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className=" mx-auto flex flex-col md:flex-row gap-2 justify-center lg:justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-bold">Event Manager</Link>
        </div>
        <div className="flex space-x-4">
            <NavLink to="/" className="text-white">Home</NavLink>
            <NavLink to="/register" className="text-white">Register</NavLink>
            <NavLink to="/event-register" className="text-white">Event Register</NavLink>
            <NavLink to="/otp-verification" className="text-white">OTP Verification</NavLink>
            <NavLink to="/events" className="text-white">Events</NavLink>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
