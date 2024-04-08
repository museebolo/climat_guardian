import {useState, useEffect} from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./CardElement.tsx";
import {SampleContext} from "@/contexts/SampleContext.tsx";
import {Data} from "@/contexts/lib.tsx";

export default function CircularElementData() {
    const [data, setData] = useState<Data>();

    const url = `${SampleContext.url}/data?limit=1&order=timestamp.desc`
    useEffect(() => {
        fetch(url, {"headers": {"Authorization": `Bearer ${SampleContext.token}`}})
            .then(response => response.json())
            .then(apiData => {
                setData(apiData[0]);
                console.log(data)
            })
            .catch(error => console.error('Erreur lors de la récupération des données de l\'API :', error));
    }, []);
    return (
        <div className="flex gap-4 mb-6 mt-6">
            <div className="w-80">
                {
                    data && data.temperature ?
                        <CardElement
                            element={<CircularElement
                                color={"orange"}
                                data={data.temperature}
                                unity={"°C"}/>}
                            theme="Temperature"/> : "pomme"
                }
            </div>

            <div className="w-80">
                {
                    data && data.humidity ?
                        <CardElement
                            element={<CircularElement
                                color={"blue"}
                                data={data.humidity}
                                unity={"%"}/>}
                            theme="Humidity"/> : "pomme"
                }
            </div>
        </div>
    );
}
