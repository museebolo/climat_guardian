"use client";
// import components
import DataCircle from "@/app/ui/dashboard/DataCircle";
import { useAllEsp } from "@/lib/data";

export default function Page() {
  const ESPList = useAllEsp();
  return (
    <>
      <div className="px-auto grid h-fit w-full min-w-[500px] grid-cols-1 gap-10 xl:grid-cols-2 2xl:grid-cols-3">
        {ESPList.map((esp, index) => (
          <DataCircle key={index} esp={esp} />
        ))}
      </div>
    </>
  );
}
