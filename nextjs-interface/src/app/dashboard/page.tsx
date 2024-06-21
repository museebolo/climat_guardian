"use client";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <div className="px-auto grid h-fit w-full min-w-[500px] grid-cols-1 gap-10 xl:grid-cols-2 2xl:grid-cols-3">
        {ESPList.map((esp, index) => (
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
        ))}
      </div>
    </>
  );
}
