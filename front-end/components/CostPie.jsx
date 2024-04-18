import React from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
const COLORS = ["#0088FE", "#00C49F"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CostPieChart = ({ overallCost, saving }) => {
  const data = [
    {
      name: "Energy Consumed ",
      value: 1000,
    },
    {
      name: "Green Energy Generated",
      value: 300,
    },
  ];
  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"
          iconSize={10}
          formatter={(value, entry, index) => {
            const color = COLORS[index % COLORS.length];
            const label = value;
            return <span style={{ color }}>{label}</span>;
          }}
        />
        <text
          y="10%"
          x="50%"
          dy={+12}
          style={{ fontSize: 20, fontWeight: "bold", fontFamily: "sans-serif" }}
          width={200}
          scaleToFit={true}
          textAnchor="middle"
          verticalAnchor="middle"
        >
          Total Energy Consumpation
        </text>
      </PieChart>
    </div>
  );
};
export default CostPieChart;
