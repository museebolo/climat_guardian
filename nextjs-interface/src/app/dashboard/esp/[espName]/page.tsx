"use client";

// import charts
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { DateRangeElement } from "@/app/ui/dashboard/DateRangeElement";
import findIpByName, { useFetchData, useLastData } from "@/lib/data";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import React from "react";

export default function Page({ params }: { params: any }) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const now = new Date();
    return {
      from: startOfMonth(now),
      to: endOfMonth(now),
    };
  });

  const from = date?.from ? format(date.from, "yyyy-MM-dd") : "";
  const to = date?.to ? format(date.to, "yyyy-MM-dd") : "";
  const precision = "minute";

  const ip = findIpByName(params.espName);
  const allData = useFetchData(precision, ip, from, to);
  const temperature = useLastData("temperature", ip);
  const humidity = useLastData("humidity", ip);

  return (
    <div className="flex w-full min-w-[500px] flex-col gap-y-5 pt-2">
      <p className="text-2xl font-bold uppercase text-black">
        {params.espName}
      </p>
      <DateRangeElement date={date} setDate={setDate} />
      <div className="flex flex-col sm:flex-row">
        <PieChartTemperature data={temperature} />
        <PieChartHumidity data={humidity} />
      </div>
      <div>
        <ChartElement data={allData} />
      </div>
    </div>
  );
}
