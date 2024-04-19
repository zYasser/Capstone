"use client";
import CostChart from "@/components/CostChart";
import CostPieChart from "@/components/CostPie";
import StatsCards from "@/components/StatsCards";

import { useEffect } from "react";
import { useState } from "react";
import CartTable from "@/components/CartTable";

export default function Solution() {
  const [domLoaded, setDomLoaded] = useState(false);
  const cartItems = [
    {
      id: 1,
      type: "Solar Inverter",
      name: "SolarMax 5000",
      quantity: 2,
      price: 170,
    },
    {
      id: 2,
      type: "PV",
      name: "SunPower 320W",
      quantity: 10,
      price: 250,
    },
    {
      type: "Solar Inverter",
      name: "SolarEdge SE3800H",
      quantity: 10,
      price: 1500,
    },
    { type: "PV", name: "Canadian Solar CS3W-415MS", quantity: 20, price: 200 },
    { type: "WIND", name: "Vestas V117-4.2MW", quantity: 5, price: 5000 },
  ];

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
          <div className="bg-green-200 rounded-lg	shadow-lg">
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
            <div className="my-52 flex flex-col items-center">
              <h1 className="text-center font-serif	text-xl	">
                Solution's Componentes
              </h1>
              <CartTable cartItems={cartItems} />
            </div>
            <div>Hello</div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
