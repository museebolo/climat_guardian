import { useEffect, useState } from "react";
import { getToken, data, avgData, esp } from "@/lib/context";

export const useFetchData = (
    precision: string,
    ip: string,
    from: string,
    to: string,
) => {
    const [data, setData] = useState<avgData[]>([]);

    useEffect(() => {
        const url = `/postgrest/rpc/avg_date?delta=${precision}&ip=eq.${ip}&and=(date.gte.${from},date.lt.${to})`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiData: avgData[]) => {
                setData(apiData);
                console.log("useFetchData", apiData);
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, [from, ip, precision, to]);
    return data;
};

export function useLastData(type: string, ip: string) {
    const [value, setValue] = useState<number | undefined>(undefined);

    useEffect(() => {
        const url = `/postgrest/data_view?limit=1&order=timestamp.desc&ip=eq.${ip}`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiData: data[]) => {
                console.log("useLastData", apiData);
                if (apiData && apiData.length > 0) {
                    if (type == "humidity") {
                        setValue(apiData[0].humidity);
                    } else setValue(apiData[0].temperature);
                }
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, [ip, type]);
    return value;
}

export const useAllEsp = () => {
    const [esp, setEsp] = useState<esp[]>([]);

    useEffect(() => {
        const url = `/postgrest/esp`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiEsp: esp[]) => {
                setEsp(apiEsp);
                console.log("useAllEsp", apiEsp);
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, []);
    return esp;
};

export default function useFindIpById(id: string) {
    const [ip, setIp] = useState<string>("");

    useEffect(() => {
        const url = `/postgrest/esp?select=ip&id=eq.${id}`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiIp: esp[]) => {
                console.log("useFindIpByName", apiIp);
                setIp(apiIp[0].ip);
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, [id]);
    return ip;
}

export function useFindNameById(id: string) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const url = `/postgrest/esp?select=name&id=eq.${id}`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiIp: esp[]) => {
                console.log("useFindIpByName", apiIp);
                setName(apiIp[0].name);
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, [id]);
    return name;
}

export function GetEspPosition(id: string) {
    const [position, setPosition] = useState<esp[]>([]);

    useEffect(() => {
        const url = `/postgrest/esp?select=x,y,name,ip&id=eq.${id}`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((response) => response.json())
            .then((apiPosition: esp[]) => {
                setPosition(apiPosition);
                console.log("GetEspPosition", apiPosition);
            })
            .catch((e) => {
                console.error("Une erreur s'est produite :", e);
            });
    }, [id]);
    if (position.length == 0 || position[0].x == null || position[0].y == null) {
        return { x: 0, y: 0, name: "", ip: "" };
    }
    return position[0];
}

// Définir une interface pour les objets dans allData
interface DataRecord {
    avg_temperature: number;
    avg_humidity: number;
    // Ajoutez d'autres propriétés si nécessaire
}

// Fonction pour calculer la moyenne d'une propriété spécifique
export function calculateAverage(
    allData: DataRecord[],
    property: keyof DataRecord,
): number {
    if (!Array.isArray(allData)) {
        console.warn("Warning: allData is not an array");
        return 0;
    } else {
        const total = allData.reduce((sum, record) => sum + record[property], 0);
        return total / allData.length;
    }
}
