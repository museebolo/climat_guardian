import { useState, useEffect } from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./CardElement.tsx";
import { SampleContext } from "@/contexts/SampleContext.tsx";
import { Data, getToken,error401 } from "@/contexts/lib.tsx";

export default function CircularElementData() {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const url = `${SampleContext.urlData}/data?limit=1&order=timestamp.desc`;
            try {
                const response = await fetch(url, { headers: { "Authorization": `Bearer ${getToken()}` } });
                if (!response.ok) {
                    error401(response)
                }
                const apiData = await response.json();
                setData(apiData[0]);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API :', error);
            }
        };

        fetchData();
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
                                unity={"°C"} />}
                            theme="Temperature" /> : "pomme"
                }
            </div>

            <div className="w-80">
                {
                    data && data.humidity ?
                        <CardElement
                            element={<CircularElement
                                color={"blue"}
                                data={data.humidity}
                                unity={"%"} />}
                            theme="Humidity" /> : "pomme"
                }
            </div>
        </div>
    );
}
