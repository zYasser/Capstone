"use client";

const LineChartLegend = () => {
  return (
    <div className="flex justify-between items-center md:gap-10 gap-2">
      <div className="flex gap-2 justify-center items-start">
        <div>
          
         
       </div>
      </div>

      <div className="flex gap-2 justify-center items-start">
        <div>
          <div className="border border-[#59B4C3] p-0.5 rounded-full">
            <div className="bg-[#59B4C3] rounded-full h-2 w-2" />
          </div>
        </div>
        <div className="-mt-0.5">
          <p className="text-[#59B4C3] text-sm">Total Carbon FootPrint Loss</p>
          <span className="text-sm opacity-70">01.01.2024 - 30.12.2024</span>
        </div>
      </div>
    </div>
  );
};

export default LineChartLegend;
