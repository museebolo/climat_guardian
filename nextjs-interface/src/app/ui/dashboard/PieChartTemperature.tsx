"use client";

import { getTempColor } from "@/lib/getColor";
import { Pie, PieChart } from "recharts";
import React, { useContext } from "react";
import { ThemeContext } from "@/lib/Theme";

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

export function PieChartTemperature({ data }: { data: any }) {
  let newColor = getTempColor(data);
  const { darkMode } = useContext(ThemeContext);

  // display the data at the center of the graph
  const renderCustomizedLabel = ({ cx, cy }: CustomizedLabelProps) => {
    let textColor;
    darkMode ? (textColor = "white") : (textColor = "black");
    return (
      <text
        x={cx}
        y={cy}
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
      >
        {data === null ? "Aucune donnée" : `${data.toFixed(2)}°C`}
      </text>
    );
  };

  // calculate where the graph ends
  const calculateEndAngle = (temperature: number) => {
    return 270 - temperature * 8;
  };

  // prepare data for graph
  const chartData = [{ name: "Température", value: data }];

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h2 className="pr-5">Température :</h2>
      <PieChart width={200} height={200}>
        <Pie
          innerRadius={60}
          dataKey="value"
          startAngle={270}
          endAngle={calculateEndAngle(data)}
          data={chartData}
          cx={100}
          cy={110}
          outerRadius={80}
          fill={newColor}
          label={renderCustomizedLabel}
          labelLine={false}
        />
      </PieChart>
    </div>
  );
}
