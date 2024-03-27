"use client";

const TAB_BUTTON = ["day", "week", "month"];

const LineChartTab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between gap-5 bg-slate-100 p-2 rounded-lg">
      {TAB_BUTTON.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 transition-all duration-300 ease-in ${
            activeTab === tab ? "bg-white rounded-lg" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default LineChartTab;
