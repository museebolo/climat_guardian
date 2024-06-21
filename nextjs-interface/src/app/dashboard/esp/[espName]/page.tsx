"use client";

// import charts
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { DateRangeElement } from "@/app/ui/dashboard/CalendarElement";

// import scripts
import findIpByName, { useFetchData, useLastData } from "@/lib/data";

export default function Page({ params }: { params: any }) {
  const precision = "day";

    // get ip from esp name and fetch data
    const ip = findIpByName(params.espName);
    const allData = useFetchData(precision, ip);

    // get last data for temperature and humidity
    const temperature = useLastData("temperature", ip);
    const humidity = useLastData("humidity", ip);

    return (
    <div className="flex w-full min-w-[500px] flex-col gap-y-5 pt-2">
      <p className="text-2xl font-bold uppercase text-black">
        {params.espName}
      </p>
      <DateRangeElement />
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
