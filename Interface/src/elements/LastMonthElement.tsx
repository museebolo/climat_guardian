import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {AverageData, getMonthName} from "@/contexts/lib.tsx";

export default function LastMonthElement({data}: { data: AverageData }) {

    return (
        <Card className="bg-white p-4 dark:bg-slate-800 w-full mt-6">
            <div className="flex">
                <CardHeader>
                    <CardTitle className="text-gray-500 dark:text-white">{getMonthName(new Date(data.date))} average</CardTitle>
                </CardHeader>
                <div className="mt-6 flex">
                    <div>
                        <p className="font-bold text-2xl ml-32 dark:text-white">
                            {data.avg_temperature.toFixed(2)}°C
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-right ml-4 text-2xl dark:text-white">
                            {data.avg_humidity.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}