// Update the DataGraph component
import { ChartElement } from "@/app/ui/dashboard/ChartElement";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAllFetchTemperatures } from "@/lib/data";

export default function DataGraph() {
    const temp = useAllFetchTemperatures();

    return (
        <>
            <Card className="flex h-fit w-full flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
                <CardTitle className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
                    <h3>Temperature</h3>
                </CardTitle>
                <CardContent className="sm:py-auto flex h-full w-full flex-row py-14">
{/*
                    <ChartElement data={} />
*/}
                </CardContent>
            </Card>

            <Card className="flex h-fit w-full flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
                <CardTitle className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
                    <h3>Humidity</h3>
                </CardTitle>
                <CardContent className="sm:py-auto flex h-full w-full flex-row py-14">
                    {/*<ChartElement />*/}
                </CardContent>
            </Card>
        </>
    );
}