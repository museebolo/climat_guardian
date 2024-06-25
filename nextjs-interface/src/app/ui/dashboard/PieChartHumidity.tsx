"use client";

import { Pie, PieChart } from "recharts";
import React from "react";
import { getHumiColor } from "@/lib/getColor";

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

export function PieChartHumidity({ data }: { data: any }) {
  let newFade = getHumiColor(data);

  // display the data at the center of the graph
  const renderCustomizedLabel = ({ cx, cy }: CustomizedLabelProps) => {
    return (
      <text
        x={cx}
        y={cy}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
      >
        {data === null ? "No data" : `${data.toFixed(2)}%`}
      </text>
    );
  };

  // calculate where the graph ends
  const calculateEndAngle = (humidity: number) => {
    return 270 - humidity * 3.6;
  };

  // prepare data for graph
  const chartData = [{ name: "Humidity", value: data }];

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h2 className="pr-5">Humidité :</h2>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          startAngle={270}
          endAngle={calculateEndAngle(data)}
          data={chartData}
          cx={100}
          cy={110}
          innerRadius={60}
          outerRadius={80}
          fill={newFade}
          label={renderCustomizedLabel}
          labelLine={false}
        />
      </PieChart>
    </div>
  );
}
