"use client";
import CostChart from "@/components/CostChart";
import CostPieChart from "@/components/CostPie";
import StatsCards from "@/components/StatsCards";
import convertToCart from "@/util/ComponentsToItems";
import { useEffect } from "react";
import { useState } from "react";
import CartTable from "@/components/CartTable";
import { pdf } from "@react-pdf/renderer";
import Invoice from "@/components/Invoice";
import { saveAs } from "file-saver";

export default function Solution() {
  let data = localStorage.getItem("result");
  data = JSON.parse(data);
  console.log();
  const generatePdfDocument = async (cartItem) => {
    const blob = await pdf(<Invoice cartItems={cartItem} />).toBlob();
    saveAs(blob, "invoice");
  };

  const [domLoaded, setDomLoaded] = useState(false);
  const cartItems = convertToCart(data);
  console.log(data);
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
          <div className="bg-green-200 rounded-lg	shadow-lg mb-10">
            <StatsCards data={data} totalCost={cartItems.totalCost} />
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
                Solution's Components
              </h1>
              <CartTable cartItems={cartItems.cartItems} />
            </div>
            <div className="flex flex-row-reverse	">
              <button
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-4 mb-5"
                onClick={() => {
                  generatePdfDocument(cartItems);
                }}
              >
                Generate PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
