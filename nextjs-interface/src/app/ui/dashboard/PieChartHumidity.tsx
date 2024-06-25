"use client";

import { Pie, PieChart } from "recharts";
import React from "react";
import { getHumiColor } from "@/script/getColor";

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
        {`${data}%`}
      </text>
    );
  };

  // Fonction pour calculer l'angle de fin en fonction de l'humidité
  const calculateEndAngle = (humidity: number) => {
    return 270 - humidity * 3.6;
  };

  // Préparation des données pour le graphique
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
