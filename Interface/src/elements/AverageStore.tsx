import {ChartElement} from "./ChartElement.tsx";
import {useEffect, useState} from "react";
import {SampleContext} from "@/contexts/SampleContext.tsx";
import {AverageData} from "@/contexts/lib.tsx";

export function AverageStore({ precision, beginning, end }: { precision: string; beginning: string; end: string; }) {
    const [data, setData] = useState<AverageData[]>([]);

    useEffect(() => {
        const url = `${SampleContext.url}/rpc/avg_date?delta=${precision}&and=(date.gte.${beginning},date.lt.${end})`;
        console.log(url);
        fetch(url, {"headers": {"Authorization": `Bearer ${SampleContext.token}`}})
            .then(response => response.json())
            .then((apiData: AverageData[]) => {
                setData(apiData);
                console.log(data)
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <>

            <ChartElement
                humidityAverages={data.map(d => d.avg_humidity)}
                temperatureAverages={data.map(d => d.avg_temperature)}
                monthNames={data.map(d => formatDate(d.date))}
            />

        </>
    );
}

export default AverageStore;
