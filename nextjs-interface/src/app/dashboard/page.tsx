"use client";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/context";
import { useFetchData, useLastData } from "@/lib/data";

const ESPList = [
  { name: "ESP N°1" },
  { name: "ESP N°2" },
  { name: "ESP N°3" },
  { name: "ESP N°4" },
  { name: "ESP N°5" },
  { name: "ESP N°6" },
];

const tempData = [{ name: "temperature", value: 28 }];
const humiData = [{ name: "humidity", value: 35 }];

export default function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    } else {
      redirect("/login");
    }
  }, []);
  const precision = "month";

  const monthData = useFetchData(precision);
  const humidity = useLastData("humidity");

  const temperature = useLastData("temperature");
  return (
    <>
      <div className="px-auto grid h-fit w-full min-w-[500px] grid-cols-1 gap-10 xl:grid-cols-2 2xl:grid-cols-3">
        {ESPList.map((esp, index) => {
          return (
            <div
              className="flex h-full flex-col items-center rounded-2xl border-2 text-center"
              key={index}
            >
              <h2 className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800">
                {esp.name}
              </h2>
              <div className="sm:py-auto flex h-full w-full flex-row py-14">
                <PieChartTemperature data={tempData} />
                <PieChartHumidity data={humiData} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
