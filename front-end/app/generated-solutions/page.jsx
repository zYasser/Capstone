"use client";

import { useState } from "react";

import StatsCards from "@/components/StatsCards";


const generatedSolutions = () => {


// Define state variables for modal
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalContent, setModalContent] = useState("");


const handleInfoClick = (type) => {
    const infoDetails = {
      content1: (
          <div className="bg-green-200 rounded-lg	shadow-lg mb-10">
            <StatsCards />
          </div>
        
      ),
    };
    setModalContent(infoDetails[type]);
    setIsModalOpen(true);
  };


// Modal component
const Modal = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <button className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          Close
        </button>
        {content}
      </div>
    </div>
  );
};


return (

  

<div className="flex-col mb-4 pt-2 pl-28 pr-2">

{isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-screen z-50">
                  <div className="relative top-20 mx-auto p-5 border w-2/3 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Information
                      </h3>
                      <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">{modalContent}</p>
                      </div>
                      <div className="items-center px-4 py-3">
                        <button
                          className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                  <p className="font-semibold">Solutions:</p>
                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type1"
                      name="solution_type"
                      value="type1"
                    />
                    <label className="ml-2">Solution 1</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("content1")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type2"
                      name="solution_type"
                      value="type2"
                    />
                    <label className="ml-2">Solution 2</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("content1")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>
                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type3"
                      name="solution_type"
                      value="type3"
                    />
                    <label className="ml-2">Solution 3</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("content1")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type4"
                      name="solution_type"
                      value="type4"
                    />
                    <label className="ml-2">Solution 4 </label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("content1")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>
                </div>

);
};

export default generatedSolutions;