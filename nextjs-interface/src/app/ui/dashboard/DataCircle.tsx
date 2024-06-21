import {useLastData} from "@/lib/data";
import {PieChartTemperature} from "@/app/ui/dashboard/PieChartTemperature";
import {PieChartHumidity} from "@/app/ui/dashboard/PieChartHumidity";

export default function DataCircle({ esp }: { esp: any }) {
    const ip = esp.ip;
    const temperature = useLastData("temperature", ip);
    const humidity = useLastData("humidity", ip);

    return (
        <div className="flex h-full flex-col items-center rounded-2xl border-2 text-center">
            <h2 className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800">
                {esp.name}
            </h2>
            <div className="sm:py-auto flex h-full w-full flex-row py-14">
                <PieChartTemperature data={temperature} />
                <PieChartHumidity data={humidity} />
            </div>
        </div>
    );
}
