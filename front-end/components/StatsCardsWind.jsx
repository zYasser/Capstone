import React from "react";

const StatsCardsWind = ({ data, totalCost }) => {
  return (
    <div className="flex justify-center animate-fade-up animate-duration-1000 animate-fill-backwards">
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20 w-4/5">
        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Total Energy Consumption</span>
            </div>
            <div className="text-3xl">{data["Total Consumption"]} kWh</div>
          </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Power Available</span>
            </div>
            <div className="text-3xl">{data["power_available"]} kW</div>
          </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Theoretical Energy</span>
            </div>
            <div className="text-3xl">{data["Theoretical Energy"]} kWh</div>
          </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Reduction in Carbon Footprint</span>
            </div>
            <div className="text-3xl">
              {data["Carbon Footprint"]} metric tons
            </div>
          </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Energy Production</span>
            </div>
            <div className="text-3xl">{data["Energy Production"]} kWh</div>
          </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow ">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
              <span>Total Cost</span>
            </div>
            <div className="text-3xl">${totalCost}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardsWind;
