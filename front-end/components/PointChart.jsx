"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { pointChartData } from "@/features/charts/point-chart/constants";
import PointChartsSelect from "@/features/charts/point-chart/point.charts.select";

const PointChartComponent = dynamic(
  () => import("@/features/charts/point-chart/point.charts"),
  { ssr: false }
);

export function PointChart() {
  const [selectedOption, setSelectedOption] = useState("This Week");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const chartData = pointChartData[selectedOption];

  const pointChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#0C359E", "#59B4C3"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
        horizontal: false,
        borderRadius: 0,
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      offsetY: 5,
      customLegendItems: ["Sales", "Revenue"],
      markers: {
        radius: 50, // Adjust the marker size if needed
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="border-2 border-gray-100 shadow-lg p-4">
      <div className="flex items-center justify-between gap-2 p-4">
        <h1 className="md:text-2xl text-lg font-semibold ">Profit this week</h1>
        <PointChartsSelect
          value={selectedOption}
          onChange={handleOptionChange}
        />
      </div>
      <PointChartComponent
        options={pointChartOptions}
        series={chartData.series}
      />
    </div>
  );
}
