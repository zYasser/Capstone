import React from "react";

const Comparison = () => {
  return (
    <div className="bg-gradient-to-r from-green-200 to-green-400 text-black min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">

      <div className="flex justify-center w-full mb-10"> 
        <div className="flex flex-col items-center justify-center mx-4 w-1/2"> 
          <p className="mb-2 text-2xl">Solar</p>
          <div className="bg-slate-50 rounded-3xl py-4 md:py-8 w-4/5 min-h-screen my-2"></div>
        </div>
        <div className="flex flex-col items-center justify-center mx-4 w-1/2"> 
          <p className="mb-2 text-2xl">Wind</p>
          <div className="bg-slate-50 rounded-3xl py-4 md:py-8 w-4/5 min-h-screen my-2"></div>
        </div>
      </div>

    </div>
  );
};

export default Comparison;
