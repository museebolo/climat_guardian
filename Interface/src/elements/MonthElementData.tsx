import {useEffect, useState} from 'react';
import {SampleContext} from "@/contexts/SampleContext.tsx";
import MonthElement from "@/elements/LastMonthElement.tsx";
import {AverageData} from "@/contexts/lib.tsx";

export default function MonthElementData() {
    const [data, setData] = useState<AverageData[]>([]);

    useEffect(() => {
        const url = `${SampleContext.urlData}/rpc/avg_date?delta=month&order=date&limit=2`;
        fetch(url, {"headers": {"Authorization": `Bearer ${SampleContext.token}`}})
            .then(response => response.json())
            .then((apiData: AverageData[]) => {
                setData(apiData);
                console.log(url);
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, []);

    return (
        <>
            {data.map(d =>
                <MonthElement data={d}/>
            )}
        </>
    );
}