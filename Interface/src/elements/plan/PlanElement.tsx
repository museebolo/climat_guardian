import CardPlanElement from "@/elements/plan/CardPlanElement.tsx";
import SideBarElement from "@/elements/SideBarElement.tsx";
import {useEffect, useState} from "react";
import {SampleContext} from "@/contexts/SampleContext.tsx";
import {Data, Esp, getToken} from "@/contexts/lib.tsx";
import AddRoomElement from "@/elements/plan/AddRoomElement.tsx";

export default function PlanElement() {
    const apiAuthToken = getToken();
    const [espData, setEspData] = useState<Esp[]>([]);
    const [Data, setData] = useState<Data[]>([]);


    useEffect(() => {
        fetch(`${SampleContext.urlData}/esp`, {"headers": {"Authorization": `Bearer ${apiAuthToken}`}})
            .then(response => response.json())
            .then((dataEsp: Esp[]) => {
                setEspData(dataEsp);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${SampleContext.urlData}/data`, {"headers": {"Authorization": `Bearer ${apiAuthToken}`}})
            .then(response => response.json())
            .then((apiData: Data[]) => {
                const groupedData: { [key: string]: Data[] } = {};
                espData.forEach((esp) => {
                    groupedData[esp.ip] = apiData.filter((data) => data.ip === esp.ip);
                });
                console.log("Données groupées par adresse IP :", groupedData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    });

    const groupedData = espData.reduce((acc: { [key: string]: Esp[] }, currentValue) => {
        if (!acc[currentValue.name]) {
            acc[currentValue.name] = [];
        }
        acc[currentValue.name].push(currentValue);
        return acc;
    }, {});

    return (
        <>
            <div className="grid grid-cols-4 gap-1 ">
                <div>
                    <SideBarElement/>
                </div>

                <div className="flex gap-2">
                    {Object.keys(groupedData).map((name, index) => (
                        <CardPlanElement
                            key={index}
                            room={name}
                        />
                    ))}
                </div>
                <AddRoomElement/>
            </div>
        </>
    )
}
