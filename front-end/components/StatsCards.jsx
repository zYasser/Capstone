import React from "react";

const StatsCards = ({ data, totalCost }) => {
  if (data == null) {
    return (
      <div className="flex justify-center animate-fade-up animate-duration-1000 animate-fill-backwards">
        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20 w-4/5">
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Overall Cost</span>
              </div>

              <div className="text-3xl">$192.1k</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                <span>32k increase</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Saving Money</span>
              </div>

              <div className="text-3xl">1350</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
                <span>3% decrease</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Time to Cover The Cost</span>
              </div>

              <div className="text-3xl">3543</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                <span>7% increase</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Total Energy Consumpation</span>
              </div>

              <div className="text-3xl">3543</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                <span>7% increase</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Total Green Energy Generated </span>
              </div>

              <div className="text-3xl">3543</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                <span>7% increase</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Reduction in Carbon Footprint</span>
              </div>

              <div className="text-3xl">3543</div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                <span>7% increase</span>

                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center animate-fade-up animate-duration-1000 animate-fill-backwards">
        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20 w-4/5">
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>DC System Size</span>
              </div>
              <div className="text-3xl">
                {data.Solutions["DC System Size"]} kW
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Energy Production</span>
              </div>
              <div className="text-3xl">
                {data.Solutions["Energy Production"]} kWh
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Total Energy Consumption</span>
              </div>
              <div className="text-3xl">{data.total_consumption} kWh</div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Reduction in Carbon Footprint</span>
              </div>
              <div className="text-3xl">
                {data.Solutions["Carbon Footprint"]} metric tons
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Total Green Energy Generated</span>
              </div>
              <div className="text-3xl">
                {data.Solutions["Clean Energy"] !== null
                  ? data.Solutions["Clean Energy"]
                  : "N/A"}{" "}
                kWh
              </div>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white shadow ">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                <span>Energy Production</span>
              </div>
              <div className="text-3xl">{totalCost}$</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default StatsCards;
