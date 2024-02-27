import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-black p-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src="./green.png" alt="" className="object-scale-down h-12" />
          <h1 href="#" className="text-2xl font-bold font text-green-800">
            Green Energy Solutions
          </h1>
        </div>
        <ul className="flex space-x-4">
          <li className="mx-3">
            <a
              href="#"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Home
            </a>
          </li>
          <li className="mx-3">
            <a
              href="#"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              About
            </a>
          </li>
          <li className="mx-3">
            <a
              href="#"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Services
            </a>
          </li>
          <li className="mx-3">
            <a
              href="#"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
