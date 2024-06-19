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

import React from "react";
import { avgData } from "@/lib/context";

export function ChartElement({ data }: { data: avgData[] }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        className="rounded-2xl border-2 border-gray-300"
        width={800}
        height={500}
        data={data}
      >
        <XAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          dataKey="date"
          padding={{ left: 20, right: 50 }}
        />
        <YAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          padding={{ top: 50, bottom: 10 }}
        />
        <ReferenceLine
          y={50}
          label={{ value: "Max humidity", position: "top" }}
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
