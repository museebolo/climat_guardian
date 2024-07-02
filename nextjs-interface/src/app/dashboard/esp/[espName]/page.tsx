"use client";

// import charts
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";

// import compoenents
import { DateRangeElement } from "@/app/ui/dashboard/DateRangeElement";
import { EspMap } from "@/app/ui/plan/espMap";

// import script
import findIpByName, {
  calculateAverage,
  GetEspPosition,
  useFetchData,
  useLastData,
} from "@/lib/data";

// import libraries
import { endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import React, {useState} from "react";

// main component
export default function Page({ params }: { params: any }) {
  // Date range selector
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const now = new Date();
    return {
      from: startOfMonth(now),
      to: endOfMonth(now),
    };
  });

  const position = GetEspPosition(params.espName);

  // Get data from the selected esp and date range
  const from = date?.from ? format(date.from, "yyyy-MM-dd") : "";
  const to = date?.to ? format(date.to, "yyyy-MM-dd") : "";
  const precision = "minute";

  // Get the ip of the selected esp and fetch the data
  const ip = findIpByName(params.espName);
  const allData = useFetchData(precision, ip, from, to);
  const temperature = useLastData("temperature", ip);
  const humidity = useLastData("humidity", ip);

  const averageTemperature = calculateAverage(allData, "avg_temperature");
  const averageHumidity = calculateAverage(allData, "avg_humidity");


  const [hoveredCircle, setHoveredCircle] = useState<string>("");
  const mouseClick = (circle: string) => {
    setHoveredCircle(circle);
  };

  return (
    <div className="flex h-full w-full min-w-[500px] flex-col gap-y-5 pt-2">
      <div className="flex justify-between">
        <DateRangeElement date={date} setDate={setDate} />
        <p className="text-2xl font-bold uppercase text-black">
          {params.espName}
        </p>
      </div>
      <div className="flex flex-row gap-x-5">
        <div className="flex w-1/2 flex-col gap-y-3">
          <p className="text-xl">Last data :</p>
          <div className="flex flex-row rounded-xl border-2 border-alto-200 p-5">
            <PieChartTemperature data={temperature} />
            <PieChartHumidity data={humidity} />
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-y-3">
          <p className="text-xl">
            Average data ( From{" "}
            {date?.from ? format(date.from, "yyyy-MM-dd") : ""} to{" "}
            {date?.to ? format(date.to, "yyyy-MM-dd") : ""}) :
          </p>
          <div className="flex flex-row rounded-xl border-2 border-alto-200 p-5">
            <PieChartTemperature data={averageTemperature} />
            <PieChartHumidity data={averageHumidity} />
          </div>
        </div>
      </div>
      <div>
        <ChartElement data={allData} />
      </div>
      <div className="flex justify-center rounded-xl border-2 border-alto-200">
        <svg
          className="h-[1000px] w-[1000px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <g className="downstairs transition-all duration-500 ease-in-out">
            <path
              className="barrier"
              d="m 47.9,53.5 8.1,0 0,-3.3 m -44.9,24.7 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.2,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 58.2,-1.3 -21.6,0 m 10,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m 19.9,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 M 78,93.2 78,98.7 M 91.8,3.52 91.8,11 m -49.5,37.1 -7.9,0 0,5.4 m 57.4,-7.5 0,6.9 m 2.8,2.9 -6.3,0 0,-2.9 m -17.6,-15.6 0,6.9 m -7.4,-7.4 0,6.9 M 58.7,6.94 58.7,29.9 M 22,41.3 l 7.5,0 M 79,52.9 79,64.4 m -1.7,-11.5 0,11.5 m 5.4,-11.5 -3.7,5.8 3.6,5.7 m -11.9,-5.8 0,5.8 m 1.6,-11.5 0,11.5 M 74,52.9 74,64.4 m 1.7,-11.5 0,11.5 m 7,-5.7 -5.2,0 m -45.9,7.9 0,-5.1 22.8,0 0,5.1 z"
            />
            <path
              className="wall"
              d="m 20.07,36.84 0,-1.81 2.16,0 0,1.81 z m 11.61,0 0,-1.81 -2.16,0 0,1.81 z m 29.31,8.4 2.28,0 0,-1.42 m 0,-6.84 0,-1.43 -20.29,0 0,9.52 m 15.73,-9.58 0,-5.47 m 0,-22.912 0,-5.073 33.06,0 0,2.166 m 0,6.729 0,35.05 3.42,0 0,18.36 -25.08,0 m -9.12,-28.79 0,9.75 -0.57,0.81 m 31.35,18.23 0,29.07 -25.58,0 m -8.11,-44.06 -0.57,0.85 -14.36,0 m -10.95,-5.13 10.78,0 0,4.9 0,3.54 m -2.91,0 7.86,0 0,-3.31 m 43.84,-14.65 -21.09,0 0,1.88 m 0,6.5 0,3.14 3.99,0 0,-11.52 m -44.29,14.48 0,3.48 5.01,0 m 48.97,-0.57 -13.68,0 0,5.7 6.84,0 m 17.67,-5.7 -7.41,0 m -5.07,0 0,11.4 m -21.15,-5.13 0,5.7 1.71,0 1.71,-2.28 0,-9.12 -3.42,0 0,0.57 m 4.63,18.24 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 0,0.64 m -46.75,-41.27 0,6.67 M 11,74.6 l 0,24.37 55.19,0 0,-16.39 -9.59,0 -3.65,-4.56 0,-3.42 -41.95,0 -6.271,-6.27 0,-27.02 17.101,0 m 7.52,0 2.85,0 0,3.76 -0.1,5.02 -5.13,-0.1 0,3.48"
            />

            <g className="text-[3px] text-blue-300 transition-all duration-500 ease-in-out">
              <EspMap
                key={ip}
                cx={position.x}
                cy={position.y}
                ip={position.ip}
                name={position.name}
                hoveredCircle={hoveredCircle}
                setHoveredCircle={setHoveredCircle}
                mouseClick={mouseClick}
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
