"use client";

// import charts
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { DateRangeElement } from "@/app/ui/dashboard/CalendarElement";
import { useFetchData } from "@/lib/data";

const tempData = [{ name: "temperature", value: 23 }];
const humiData = [{ name: "humidity", value: 38 }];

export default function Page({ params }: { params: any }) {
  const precision = "day";
  const monthData = useFetchData(precision);
  return (
    <div className="flex w-full min-w-[500px] flex-col gap-y-5 pt-2">
      <p className="text-2xl font-bold uppercase text-black">
        {params.espName}
      </p>
      <DateRangeElement />
      <div className="flex flex-col sm:flex-row">
        <PieChartTemperature data={tempData} />
        <PieChartHumidity data={humiData} />
      </div>
      <div>
        <ChartElement data={monthData} />
      </div>
    </div>
  );
}
