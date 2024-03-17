import generateCostProfitArray from "@/util/generateCostProfitArray";
import generateYearArray from "@/util/generateYearArray";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CostChart = ({ costs }) => {
  const x = generateCostProfitArray(costs);
  const y = generateYearArray(costs.years);
  console.log(x, y);
  const data = x.map((profit, index) => ({
    year: y[index],
    profit,
  }));
  console.log(data);

  return (
    <LineChart
      width={530}
      height={250}
      data={data}
      margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
    </LineChart>
  );
};

export default CostChart;
