"use client";

// import hooks
import { useState, useEffect } from "react";

// import components
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";

// import functions
import { useRouter } from "next/navigation";
import { useLastData} from "@/lib/data";


const ESPList = [
  { name: "ESP N°1", ip:"172.16.5.178" },
  { name: "ESP N°2" ,ip:"172.16.4.100"},
  { name: "ESP N°3" ,ip:"172.16.5.178"},
  { name: "ESP N°4", ip:"172.16.4.100" },
  { name: "ESP N°5", ip:"172.16.5.178" },
  { name: "ESP N°6", ip:"172.16.4.100"},
];

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  /*
  // get ip from esp name and fetch data
  const ip = "172.16.4.100";


  // get last data for temperature and humidity
  const temperature = useLastData("temperature", ip);
  const humidity = useLastData("humidity", ip);
*/

  return (
      <>
        <div className="px-auto grid h-fit w-full min-w-[500px] grid-cols-1 gap-10 xl:grid-cols-2 2xl:grid-cols-3">
          {ESPList.map((esp, index) => {
            // get ip from esp name and fetch data
            const ip = esp.ip;

            // get last data for temperature and humidity
            const temperature = useLastData("temperature", ip);
            const humidity = useLastData("humidity", ip);

            return (
                <div
                    className="flex h-full flex-col items-center rounded-2xl border-2 text-center"
                    key={index}
                >
                  <h2 className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800">
                    {esp.name}
                  </h2>
                  <div className="sm:py-auto flex h-full w-full flex-row py-14">
                    <PieChartTemperature data={temperature} />
                    <PieChartHumidity data={humidity} />
                  </div>
                </div>
            );
          })}
        </div>
      </>
  );
}