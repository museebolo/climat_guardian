"use client";
// import components
import DataCircle from "@/app/ui/dashboard/DataCircle";

const ESPList = [
  { name: "ESP N°1", ip: "172.16.5.178" },
  { name: "ESP N°2", ip: "172.16.4.100" },
  { name: "ESP N°3", ip: "172.16.5.178" },
  { name: "ESP N°4", ip: "172.16.4.100" },
  { name: "ESP N°5", ip: "172.16.5.178" },
  { name: "ESP N°6", ip: "172.16.4.100" },
];

export default function Page() {
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
