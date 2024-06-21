"use client";

import { getTempColor } from "@/script/getColor";
import { Pie, PieChart } from "recharts";
import React from "react";

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

  // Fonction pour rendre le libellé au centre du cercle
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
        {`${data} °C`}
      </text>
    );
  };
  const calculateEndAngle = (temperature: number) => {
    return 270 - temperature * 8;
  };

  // Préparation des données pour le graphique + arrondire la température
  const chartData = [
    { name: "temperature", value: data },
  ];

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
        <stop offset="5%" stopColor={"#FFF"} stopOpacity={0.8} />
        <stop offset="95%" stopColor={newColor} stopOpacity={0} />
      </PieChart>
    </div>
  );
}
