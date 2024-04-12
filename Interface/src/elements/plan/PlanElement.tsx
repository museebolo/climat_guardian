import CardPlanElement from "@/elements/plan/CardPlanElement.tsx";
import SideBarElement from "@/elements/SideBarElement.tsx";
import { useEffect, useState } from "react";
import { SampleContext } from "@/contexts/SampleContext.tsx";
import { Data, getToken } from "@/contexts/lib.tsx";

export default function PlanElement() {
    const apiAuthToken = getToken();
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetch(`${SampleContext.urlData}/data`, { "headers": { "Authorization": `Bearer ${apiAuthToken}` } })
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    const groupedData = data.reduce((acc: { [key: string]: Data[] }, currentValue) => {
        if (!acc[currentValue.ip]) {
            acc[currentValue.ip] = [];
        }
        acc[currentValue.ip].push(currentValue);
        return acc;
    }, {});

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <SideBarElement/>
                </div>
                {Object.keys(groupedData).map((ip, index) => (
                    <CardPlanElement
                        key={index}
                        room={ip}
                    />
                ))}
            </div>
        </>
    )
}
