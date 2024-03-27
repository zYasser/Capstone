"use client";

import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { dashboardStates } from "./constants";

const DashboardStates = () => {
  return (
    <div className="w-full grid md:gap-10 gap-5 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStates.map((state) => (
        <div
          key={state.id}
          className="bg-white w-full p-6 border-2 border-gray-100 shadow-lg"
        >
          <p className="text-blue-500 text-xl font-bold bg-blue-50 p-3 rounded-full w-11">
            <state.icon />
          </p>
          <h3 className="text-2xl font-bold pt-3">{state.value}</h3>
          <div className="flex justify-between gap-2 text-sm pt-1 font-medium text-gray-400">
            <p>{state.title}</p>
            <p className="flex items-center gap-1 text-green-500">
              {state.progressValue}
              {state.progress === "up" ? <IoMdArrowUp /> : <IoMdArrowDown />}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStates;
