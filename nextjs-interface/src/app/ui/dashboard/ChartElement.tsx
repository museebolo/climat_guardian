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
        <Tooltip
          cursor={{
            stroke: "#334155",
            radius: 4,
          }}
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) return null;
            return (
              <>
                <div className="w-[250px] rounded-xl bg-secondary dark:bg-gray-900">
                  <div className="p-5">
                    <div className="flex flex-col">
                      <h1 className="text-black dark:text-zinc-50">
                        Date :{" "}
                        {new Date(payload[0].payload.date).toLocaleDateString() + " " + new Date(payload[0].payload.date).toLocaleTimeString()}
                      </h1>
                      <p className="text-black dark:text-zinc-50">
                        Temperature :{" "}
                        {payload[0].payload.avg_temperature.toFixed(2)}°C
                      </p>
                      <p className="text-black dark:text-zinc-50">
                        Humidity : {payload[0].payload.avg_humidity.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        />
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
