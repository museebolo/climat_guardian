import {Data} from "@/contexts/lib.tsx";
import CircularElement from "@/elements/CircularElement.tsx";
import CardElement from "@/elements/CardElement.tsx";

export default function CardPlanElement({room, data}: { room: string, data: Data[] }) {
    const calculateAverage = (values: number[]): number => {
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, value) => acc + value, 0);
        return sum / values.length;
    };

    const temperatures: number[] = [];
    const humidities: number[] = [];

    data.forEach((item) => {
        if (item.temperature) temperatures.push(item.temperature);
        if (item.humidity) humidities.push(item.humidity);
    });

    const averageTemperature = calculateAverage(temperatures);
    const averageHumidity = calculateAverage(humidities);

    return (
        <>
            <div className="flex-col mt-12">
                <div className="text-xl mb-4 font-bold">
                    {room}
                </div>

                <div className="flex">

                    <CardElement
                        element={<CircularElement
                            color={"orange"}
                            data={averageTemperature.toFixed(2)}
                            unity={"°C"}/>}
                        theme="Humidity"/>


                    <CardElement
                        element={<CircularElement
                            color={"blue"}
                            data={averageHumidity.toFixed(2)}
                            unity={"%"}/>}
                        theme="Humidity"/>
                </div>

            </div>
        </>
    )
}
