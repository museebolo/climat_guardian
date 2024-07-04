import { useLastData } from "@/lib/data";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function DataCircle({ esp }: { esp: any }) {
  const ip = esp.ip;
  const temperature = useLastData("temperature", ip);
  const humidity = useLastData("humidity", ip);

  return (
    <Card className="flex h-full flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
      <CardTitle className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
        {esp.name}
      </CardTitle>
      <CardContent className="sm:py-auto flex h-full w-full flex-row py-14">
        <PieChartTemperature data={temperature} />
        <PieChartHumidity data={humidity} />
      </CardContent>
    </Card>
  );
}
