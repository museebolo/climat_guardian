"use client";
// import components
import DataCircle from "@/app/ui/dashboard/DataCircle";
import { useAllEsp, useAllFetchTemperatures } from "@/lib/data";
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import DataGraph from "@/app/ui/dashboard/DataGraph";

export default function Page() {
  const ESPList = useAllEsp();

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex w-full flex-col items-center justify-center gap-y-5">
          <DataGraph />
        </div>
        <div className="px-auto grid h-fit w-full min-w-[500px] grid-cols-1 gap-10 xl:grid-cols-2 2xl:grid-cols-3">
          {ESPList.map((esp, index) => (
            <DataCircle key={index} esp={esp} />
          ))}
        </div>
      </div>
    </>
  );
}
