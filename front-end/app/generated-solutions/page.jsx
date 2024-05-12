"use client";

import React, { useState } from "react";

import SideBar from "@/components/SideBar";

import StatsCards from "@/components/StatsCards";

import Link from "next/link";

import DynamicAlert from "@/components/DynamicAlert";

const App = () => {

  const [selectedIds, setSelectedIds] = useState([]);

  const [isComparing, setIsComparing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState("");

  const data = [

    { id: 1, overallCost: 1000, totalEnergyGenerated: 500, details:
      <div className="bg-green-200 rounded-lg	shadow-lg mb-10">
      <StatsCards />
    </div>
      },

    { id: 2, overallCost: 1500, totalEnergyGenerated: 700, details: 
      
      <div className="bg-green-200 rounded-lg	shadow-lg mb-10">
            <StatsCards />
          </div>
     },

    { id: 3, overallCost: 1200, totalEnergyGenerated: 600, details: 
      <div className="bg-green-200 rounded-lg	shadow-lg mb-10">
            <StatsCards />
          </div>
     },

  ];

  const handleSelect = (id) => {

    if (selectedIds.includes(id)) {

      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));

    } else {

      if (selectedIds.length < 2) {

        setSelectedIds([...selectedIds, id]);

      } else {

        setErrorMessage("You can't select more than two elements.");

      }

    }

  };

  const handleSubmit = () => {

    if (selectedIds.length != 2) {

      setErrorMessage("You need to select 2 solutions");

      return;

    }

    console.log(selectedIds);

  };

  const handleCompare = () => {

    setIsComparing(!isComparing);

  };

  const handleInfoClick = (details) => {

    setModalContent(details);

    setIsModalOpen(true);

  };

  const Modal = ({ onClose }) => (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">

      <div className="bg-white p-8 rounded-lg">

        <div>{modalContent}</div>

        <div className="flex justify-center items-center px-4">
                        <button
                          className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={onClose}
                        >
                          Close
                        </button>
                      </div>

      </div>

    </div>

  );

  return (

    <div className="container mx-auto mt-8">

      <SideBar />

      <div className="flex justify-center">

        <div className="w-4/5 overflow-x-auto">

          <div className="flex justify-end mb-4">

            <button onClick={handleCompare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

              {isComparing ? "Cancel" : "Compare"}

            </button>

            {isComparing && (

              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded">

                Submit

              </button>

            )}

          </div>

          <table className="table-auto w-full ">

            <thead>

              <tr>

                <th className="px-4 py-2 bg-gray-300">Link</th>

                <th className="px-4 py-2 bg-gray-300">Overall Cost</th>

                <th className="px-4 py-2 bg-gray-300">Performance Ratio</th>

                <th className="px-4 py-2"></th>

              </tr>

            </thead>

            <tbody>

              {data.map((item) => (

                <tr key={item.id} className={isComparing && selectedIds.includes(item.id) ? "bg-gray-300" : ""}>

                  <td className="border px-4 py-2">

                    <Link href={`/solution/${item.id}`}>{item.id}</Link>

                  </td>

                  <td className="border px-4 py-2">{item.overallCost}₺</td>

                  <td className="border px-4 py-2">{item.totalEnergyGenerated}</td>

                  <td className="px-4 py-2 flex justify-start">

                    <button

                      onClick={() => handleSelect(item.id)}

                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 ${isComparing ? "" : "hidden"}`}

                    >

                      {selectedIds.includes(item.id) ? "Deselect" : "Select"}

                    </button>

                    <button

                      onClick={() => handleInfoClick(item.details)}

                      className=" bg-gray-200 hover:bg-gray-400 text-black py-2 px-4 rounded"

                    >

                      Info

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {errorMessage && <DynamicAlert error={errorMessage} />}

        </div>

      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

    </div>

  );

};

export default App;