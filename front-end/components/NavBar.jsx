import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-black p-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 href="#" className="text-2xl font-bold font text-green-800">
          Green Energy Solutions
        </h1>
        <ul className="flex space-x-4">
          <li className="mx-4">
            <a href="#" className="hover:text-green-700">
              Home
            </a>
          </li>
          <li className="mx-3">
            <a href="#" className="hover:text-green-700">
              About
            </a>
          </li>
          <li className="mx-3">
            <a href="#" className="hover:text-green-700">
              Services
            </a>
          </li>
          <li className="mx-3">
            <a href="#" className="hover:text-green-700">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
