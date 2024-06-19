import { useEffect, useState } from "react";
import {
  SampleContext,
  getToken,
  data,
  avgData,
} from "@/lib/context";

export const useFetchData = (precision: string) => {
  const [data, setData] = useState<avgData[]>([]);

  useEffect(() => {
    const url = `${SampleContext.urlData}/rpc/avg_date?delta=${precision}`;
    fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => response.json())
      .then((apiData: avgData[]) => {
        setData(apiData);
      })
      .catch((e) => {
        console.error("Une erreur s'est produite :", e);
      });
  }, [precision]);
  return data;
};

export function useLastData(type: string) {
  const [temperature, setTemperature] = useState<number | undefined>(undefined);

  useEffect(() => {
    const url = `${SampleContext.urlData}/data?limit=1&order=timestamp.desc`;
    fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => response.json())
      .then((apiData: data[]) => {
        if (apiData && apiData.length > 0) {
          if (type == "humidity") {
            setTemperature(apiData[0].humidity);
          } else setTemperature(apiData[0].temperature);
        }
      })
      .catch((e) => {
        console.error("Une erreur s'est produite :", e);
      });
  }, [type]);
  return temperature;
}
