import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {AverageData, getMonthName} from "@/contexts/lib.tsx";

export default function MonthElement({data}: { data: AverageData }) {

    return (
        <Card className="bg-white p-4 dark:bg-slate-800 w-full">
            <div className="flex">
                <CardHeader>
                    <CardTitle className="text-gray-500 dark:text-white">{getMonthName(new Date(data.date))} average</CardTitle>
                </CardHeader>
                <div className="mt-12 text-center flex">
                    <div>
                        <h1 className="font-bold text-2xl mr-16 dark:text-white">
                            {data.avg_temperature.toFixed(2)}°C
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl mr-16 dark:text-white">
                            {data.avg_temperature.toFixed(2)}%
                        </h1>
                    </div>
                </div>
            </div>
        </Card>
    );
}