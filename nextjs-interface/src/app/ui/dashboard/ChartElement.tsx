"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import React, { useContext } from "react";
import { avgData } from "@/lib/context";
import { ThemeContext } from "@/lib/Theme";

export function ChartElement({ data }: { data: avgData[] }) {
  const { darkMode } = useContext(ThemeContext);

  let textColor;
  darkMode ? (textColor = "white") : (textColor = "");
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={800} height={500} data={data}>
        <XAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          dataKey="date"
          stroke={textColor}
          tickFormatter={(value: string) =>
            new Date(value).toLocaleDateString()
          }
          padding={{ left: 20, right: 50 }}
        />
        <YAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          stroke={textColor}
          padding={{ top: 50, bottom: 10 }}
        />
        <ReferenceLine
          y={50}
          label={{ value: "Max humidity", position: "top", stroke: textColor }}
          stroke="red"
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg_humidity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth="2px"
        />
        <Line
          type="monotone"
          dataKey="avg_temperature"
          strokeWidth="2px"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
