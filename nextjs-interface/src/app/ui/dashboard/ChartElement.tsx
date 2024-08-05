import React, { useContext } from "react";
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
import { avgData } from "@/lib/context";
import { ThemeContext } from "@/lib/Theme";

export function ChartElement({ data }: { data: avgData[] }) {
  const { darkMode } = useContext(ThemeContext);

  let textColor = darkMode ? "white" : "";

  if (!Array.isArray(data) || data === undefined) {
    console.error("Data is not an array or is undefined");
    return null;
  }

  const dateChanges = data.reduce((acc: any[], curr, index, src) => {
    if (
      index > 0 &&
      curr?.date &&
      src[index - 1]?.date &&
      new Date(curr.date).getDate() !== new Date(src[index - 1].date).getDate()
    ) {
      acc.push(curr.date);
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={800} height={500} data={data}>
        <XAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          dataKey="date"
          stroke={textColor}
          tickFormatter={(value: string) => {
            const date = new Date(value);
            return `${date.toLocaleDateString()}\n${date.toLocaleTimeString()}`;
          }}
          tick={{ fill: textColor, fontSize: 12, width: 75, dy: 10 }}
          height={60}
        />
        <YAxis
          fontSize={16}
          tickLine={false}
          axisLine={false}
          stroke={textColor}
          padding={{ top: 50, bottom: 10 }}
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
                        {new Date(
                          payload[0].payload.date,
                        ).toLocaleDateString() +
                          " " +
                          new Date(payload[0].payload.date).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
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
        {dateChanges.map((date, index) => (
          <ReferenceLine
            key={index}
            x={date}
            stroke="Gray"
            ifOverflow="extendDomain"
            label={{ value: "Date change", position: "top", fill: "green" }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
