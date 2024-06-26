import { useEffect, useState } from "react";
import {SampleContext, getToken, data, avgData, esp} from "@/lib/context";
import { links } from "@/app/ui/dashboard/espLinks";

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
    const url = `/postgrest/data?limit=1&order=timestamp.desc&ip=eq.${ip}`;
    fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => response.json())
      .then((apiData: data[]) => {
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
          console.log(apiEsp)
        })
        .catch((e) => {
          console.error("Une erreur s'est produite :", e);
        });
  }, []);
  return esp;
};

export default function findIpByName(name: string) {
  const link = links.find((link: { name: string }) => link.name === name);
  return link ? link.ip : "IP non trouvée";
}
