import React, { useContext, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation";
import { ScanSearch } from "lucide-react";

export function ChartElement({ data }: { data: avgData[] }) {
  const { darkMode } = useContext(ThemeContext);
  const pathname = usePathname();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

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
    <div>
      {message && (
        <div className="animate-slide-in fixed right-5 top-5 z-50 flex items-center gap-2 rounded border-l-4 border-l-green-900 bg-green-50 p-4 text-green-900 shadow-lg dark:border-l-green-700 dark:bg-green-900 dark:text-green-50">
          <ScanSearch />{" "}
          <span dangerouslySetInnerHTML={{ __html: message }}></span>
        </div>
      )}

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={800}
          height={500}
          data={data}
          onClick={(event) => {
            if (
              event &&
              event.activePayload &&
              event.activePayload.length > 0
            ) {
              const clickedDate = new Date(event.activePayload[0].payload.date);
              const from = new Date(clickedDate);
              const to = new Date(clickedDate);
              to.setDate(to.getDate() + 1);

              const espId = pathname.split("/").pop();
              router.push(
                `/dashboard/esp/${espId}?precision=Hour&from=${from.toISOString()}&to=${to.toISOString()}`,
              );
              const swissDateFormat = from.toLocaleDateString("fr-CH", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              });
              setMessage(
                `Jour du <strong>${swissDateFormat}</strong> affiché en détail`,
              );
              setTimeout(() => setMessage(null), 5000);
            }
          }}
        >
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
                            new Date(
                              payload[0].payload.date,
                            ).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </h1>
                        <p className="text-black dark:text-zinc-50">
                          Température :{" "}
                          {payload[0].payload.avg_temperature.toFixed(2)}°C
                        </p>
                        <p className="text-black dark:text-zinc-50">
                          Humidité :{" "}
                          {payload[0].payload.avg_humidity.toFixed(2)}%
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
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
