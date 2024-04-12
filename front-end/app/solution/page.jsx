"use client";
import CostChart from "@/components/CostChart";
import CostPieChart from "@/components/CostPie";
import StatsCards from "@/components/StatsCards";
import { useEffect } from "react";
import { useState } from "react";

export default function Solution() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="w-4/5">
        <div className="">
          <h1 className="text-center text-black font-Roboto font-bold text-2xl pt-10 mb-10">
            Solution
          </h1>
        </div>
        {domLoaded && (
          <div className="">
            <StatsCards />
            <div className="flex justify-center  w-full mx-4 ">
              <div className="bg-white mr-14  shadow-lg w-3/5">
                <CostChart
                  costs={{ cost: 300000, profit: 3000 * 12, years: 10 }}
                ></CostChart>
              </div>
              <div className="bg-white shadow-lg h-fit w-fit">
                <CostPieChart></CostPieChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
