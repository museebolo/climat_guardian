import { useLastData } from "@/lib/data";
import { PieChartTemperature } from "@/app/ui/dashboard/PieChartTemperature";
import { PieChartHumidity } from "@/app/ui/dashboard/PieChartHumidity";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function DataCircle({ esp }: { esp: any }) {
  const ip = esp.ip;
  const temperature = useLastData("Température", ip);
  const humidity = useLastData("Humidité", ip);

  return (
    <Card className="flex h-fit flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
      <CardTitle className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
        {esp.name}
      </CardTitle>
      <CardContent className="sm:py-auto flex h-full w-full flex-row py-14 max-sm:flex-col max-sm:justify-center">
        <PieChartTemperature data={temperature} />
        <PieChartHumidity data={humidity} />
      </CardContent>
    </Card>
  );
}
