import { ChartElement } from "./ChartElement.tsx";
import { useEffect, useState } from "react";
import { SampleContext } from "@/contexts/SampleContext.tsx";
import { AverageData, getToken } from "@/contexts/lib.tsx";

export function MonthlyAverageStore() {
    const apiAuthToken = getToken();
    const [data, setData] = useState<AverageData[]>([]);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        fetch(`${SampleContext.urlData}/month`, { "headers": { "Authorization": `Bearer ${apiAuthToken}` } })
            .then(response => response.json())
            .then((apiData: AverageData[]) => {
                setData(apiData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    const temperatureAverages = data.map(entry => entry.avg_temperature);
    const humidityAverages = data.map(entry => entry.avg_humidity);

    return (
        <>
            <ChartElement humidityAverages={humidityAverages} temperatureAverages={temperatureAverages} monthNames={monthNames} />
        </>
    );
}

export default MonthlyAverageStore;
