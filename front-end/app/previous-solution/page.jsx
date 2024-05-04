"use client";

import DynamicAlert from "@/components/DynamicAlert";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import React, { useState } from "react";

const ComparisonTable = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div>
      <SideBar></SideBar>
      <div className="overflow-x-auto flex justify-center ml-6">
        <div className="w-4/5 overflow-x-auto ">
          <div className="flex justify-end mb-4 ">
            <button
              onClick={handleCompare}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isComparing ? "Cancel" : "Compare"}
            </button>
            {isComparing ? (
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Link</th>
                <th className="px-4 py-2">Overall Cost</th>
                <th className="px-4 py-2">Total Energy Generated</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={
                    isComparing && selectedIds.includes(item.id)
                      ? "bg-gray-300"
                      : ""
                  }
                >
                  <td className="border px-4 py-2">
                    <Link href={`/solutin/${item.id}`}>{item.id}</Link>
                  </td>
                  <td className="border px-4 py-2">{item.overallCost}₺</td>
                  <td className="border px-4 py-2">
                    {item.totalEnergyGenerated}
                  </td>
                  <td className=" px-4 py-2">
                    <button
                      onClick={() => handleSelect(item.id)}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        isComparing ? "" : "hidden"
                      }`}
                    >
                      {selectedIds.includes(item.id) ? "Deselect" : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          {errorMessage != "" ? <DynamicAlert error={errorMessage} /> : ""}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Example data
  const data = [
    { id: 1, overallCost: 1000, totalEnergyGenerated: 500 },
    { id: 2, overallCost: 1500, totalEnergyGenerated: 700 },
    { id: 3, overallCost: 1200, totalEnergyGenerated: 600 },
  ];

  return (
    <div className="container mx-auto mt-8">
      <ComparisonTable data={data} />
    </div>
  );
};

export default App;
