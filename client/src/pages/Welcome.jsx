import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold ">Welcome to the X Event Manager</h1>
        <Link
          to="/register"
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </Link>
      </div>
    </>
  );
};

export default Welcome;
