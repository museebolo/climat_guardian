"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useContext, useEffect, useState, Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFindIpById, {
  useAllEsp,
  useFetchAllData,
  useFetchData,
} from "@/lib/data";
import { differenceInDays, endOfWeek, format, startOfWeek } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangeElement } from "@/app/ui/dashboard/DateRangeElement";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, CornerLeftDown, CornerRightDown } from "lucide-react";
import { ThemeContext } from "@/lib/Theme";
import { avgData } from "@/lib/context";

export default function DataGraph() {
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const now = new Date();
    return {
      from: startOfWeek(now),
      to: endOfWeek(now),
    };
  });

  const [selectedEsp, setSelectedEsp] = useState<string | undefined>(undefined);
  const [selectedEsp2, setSelectedEsp2] = useState<string | undefined>(
    undefined,
  );
  const [selectedOption, setSelectedOption] = useState<string>("1");

  const dateRangeInDays =
    date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;

  const ip1 = useFindIpById(selectedEsp ? selectedEsp : "");
  const ip2 = useFindIpById(selectedEsp2 ? selectedEsp2 : "");

  const from = date?.from ? format(date.from, "yyyy-MM-dd") : "";
  const to = date?.to ? format(date.to, "yyyy-MM-dd") : "";
  const [precision, setPrecision] = useState("Day");
  const esp = useAllEsp();

  let allDataEsp1: avgData[] | null = useFetchData(precision, ip1, from, to);
  let allDataEsp2: avgData[] | null = useFetchData(precision, ip2, from, to);

  const combinedDataMap = new Map<string, any>();

  const allDataEsp = useFetchAllData(precision, from, to);

  if (selectedOption === "1" && Array.isArray(allDataEsp)) {
    allDataEsp.forEach((data) => {
      if (!combinedDataMap.has(data.date)) {
        combinedDataMap.set(data.date, {
          date: data.date,
          avg_temperature: [],
          avg_humidity: [],
        });
      }
      const existingData = combinedDataMap.get(data.date);
      existingData.avg_temperature.push(data.avg_temperature);
      existingData.avg_humidity.push(data.avg_humidity);
      combinedDataMap.set(data.date, existingData);
    });
  } else {
    if (Array.isArray(allDataEsp1)) {
      allDataEsp1.forEach((data) => {
        combinedDataMap.set(data.date, {
          ...data,
          avg_temperature_esp1: data.avg_temperature,
          avg_humidity_esp1: data.avg_humidity,
        });
      });
    }

    if (Array.isArray(allDataEsp2)) {
      allDataEsp2.forEach((data) => {
        if (combinedDataMap.has(data.date)) {
          const existingData = combinedDataMap.get(data.date);
          combinedDataMap.set(data.date, {
            ...existingData,
            avg_temperature_esp2: data.avg_temperature,
            avg_humidity_esp2: data.avg_humidity,
          });
        } else {
          combinedDataMap.set(data.date, {
            ...data,
            avg_temperature_esp2: data.avg_temperature,
            avg_humidity_esp2: data.avg_humidity,
          });
        }
      });
    }
  }

  const combinedData = Array.from(combinedDataMap.values());

  const { darkMode } = useContext(ThemeContext);
  let textColor = darkMode ? "white" : "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const esp1 = params.get("esp1");
    const esp2 = params.get("esp2");

    if (esp1) setSelectedEsp(esp1);
    if (esp2) setSelectedEsp2(esp2);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (selectedEsp) query.set("esp1", selectedEsp);
    if (selectedEsp2) query.set("esp2", selectedEsp2);

    if (selectedOption === "1") {
      query.delete("esp1");
      query.delete("esp2");
      allDataEsp1 = [];
      allDataEsp2 = [];
    }

    if (dateRangeInDays > 7) {
      setPrecision("Day");
      query.set("precision", "Day");
    } else {
      query.set("precision", precision);
    }

    router.push(`?${query.toString()}`);
  }, [
    selectedEsp,
    selectedEsp2,
    selectedOption,
    precision,
    dateRangeInDays,
    router,
  ]);

  const handleDateChange = (newDate: DateRange | undefined) => {
    const from = newDate?.from ? newDate.from.toISOString() : "";
    const to = newDate?.to ? newDate.to.toISOString() : "";

    router.push(`?precision=${precision}&from=${from}&to=${to}`);
  };

  const handleSelect = (value: any) => {
    const query = new URLSearchParams(window.location.search);
    if (dateRangeInDays > 7 && value === "Hour") {
      value = "Day";
    }
    setPrecision(value);
    query.set("precision", value);
    router.push(
      `?${query.toString()}&from=${date?.from?.toISOString()}&to=${date?.to?.toISOString()}`,
    );
  };

  const colorPalette = [
    "#1f77b4", // Bleu
    "#ff7f0e", // Orange
    "#2ca02c", // Vert
    "#d62728", // Rouge
    "#9467bd", // Violet
    "#8c564b", // Marron
    "#e377c2", // Rose
    "#7f7f7f", // Gris
    "#bcbd22", // Jaune-vert
    "#17becf", // Bleu-vert
    "#f4a582", // Pêche
    "#d95f02", // Orange foncé
    "#7570b3", // Bleu-violet
    "#e7298a", // Rose-rouge
    "#66a61e", // Vert clair
    "#e6ab02", // Jaune
    "#a6761d", // Terre cuite
    "#6a3d9a", // Violet foncé
    "#ff9896", // Rose pâle
    "#f5b7b1", // Rose clair
    "#d84d1f", // Rouge-orang
    "#a6d854", // Vert clair
    "#ffcc00", // Jaune doré
    "#6c2c3b", // Brun foncé
    "#c5b0d5", // Violet pâle
    "#f7b7a3", // Pêche clair
    "#1f77b4", // Bleu
    "#8c6d31", // Bronze
    "#d62728", // Rouge
    "#e377c2", // Rose
    "#7f7f7f", // Gris
    "#bcbd22", // Jaune-vert
    "#17becf", // Bleu-vert
  ];

  /*
        const allData = useFetchData(precision, "1", from, to);
    */

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="flex h-fit w-full flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
          <CardTitle className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
            <h3>
              Comparison of Temperature and Humidity
              <span className="font-normal italic text-gray-400">
                (From {from || "..."} to {to || "..."} )
              </span>
            </h3>
          </CardTitle>

          <style jsx>{``}</style>

          <div className="flex max-h-full w-full items-center gap-2 overflow-x-auto overflow-y-auto p-6">
            <div className="flex w-fit items-center">
              <Select
                onValueChange={(value) => setSelectedOption(value)}
                value={selectedOption}
              >
                <SelectTrigger
                  id="select-precision"
                  className="w-[200px] dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <SelectValue placeholder="Comparer ..."></SelectValue>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="flex w-60 gap-2 dark:bg-zinc-800"
                >
                  <SelectItem
                    value="1"
                    className="cursor-pointer bg-white dark:bg-zinc-900"
                  >
                    Comparer tout les esp
                  </SelectItem>
                  <SelectItem
                    value="2"
                    className="cursor-pointer bg-white dark:bg-zinc-900"
                  >
                    Comparer deux esp
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedOption === "2" && (
              <div className="flex gap-2 rounded">
                <div className="flex w-fit items-center gap-2">
                  <Select
                    onValueChange={(value) => setSelectedEsp(value)}
                    value={selectedEsp}
                  >
                    <SelectTrigger
                      id="select-precision"
                      className="w-[200px] border-purple-600 bg-purple-50 dark:bg-purple-900"
                    >
                      <SelectValue placeholder="...">
                        {esp.find(
                          (espItem) => espItem.id.toString() === selectedEsp,
                        )?.name || "..."}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="flex w-60 gap-2 dark:bg-zinc-800"
                    >
                      {esp
                        .filter(
                          (espItem) => espItem.id.toString() !== selectedEsp2,
                        )
                        .map((espItem) => (
                          <SelectItem
                            key={espItem.id}
                            value={espItem.id.toString()}
                            className="cursor-pointer"
                          >
                            {espItem.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center">
                  <Select
                    onValueChange={(value) => setSelectedEsp2(value)}
                    value={selectedEsp2}
                  >
                    <SelectTrigger
                      id="select-precision"
                      className="w-[200px] border-yellow-600 bg-yellow-50 dark:bg-yellow-900"
                    >
                      <SelectValue placeholder="...">
                        {esp.find(
                          (espItem) => espItem.id.toString() === selectedEsp2,
                        )?.name || "..."}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="flex w-60 gap-2 dark:bg-zinc-800"
                    >
                      {esp
                        .filter(
                          (espItem) => espItem.id.toString() !== selectedEsp,
                        )
                        .map((espItem) => (
                          <SelectItem
                            key={espItem.id}
                            value={espItem.id.toString()}
                            className="cursor-pointer"
                          >
                            {espItem.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {selectedOption === "1" && (
              <div className="min-w-56">
                <h1 className="flex items-center gap-2 rounded border border-green-400 bg-green-100 p-[7px] font-semibold text-green-800 dark:border-green-600 dark:bg-green-900 dark:text-white">
                  <Check /> Comparer tout les esp
                </h1>
              </div>
            )}

            <div className="w-fit">
              <DateRangeElement
                date={date}
                setDate={(newDate: DateRange | undefined) => {
                  setDate(newDate);
                  handleDateChange(newDate);
                }}
              />
            </div>

            <div className="w-fit">
              <Select onValueChange={handleSelect}>
                <SelectTrigger
                  id="select-precision"
                  className="w-fit min-w-[75px] dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <SelectValue placeholder={precision}></SelectValue>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="flex w-60 gap-2 dark:bg-zinc-800"
                >
                  <SelectItem value="Month" className="cursor-pointer">
                    Month
                  </SelectItem>
                  <SelectItem
                    value="Day"
                    className="cursor-pointer rounded-none border-t-2 border-secondary dark:border-gray-700"
                  >
                    Day
                  </SelectItem>
                  <SelectItem
                    value="Hour"
                    className={`cursor-pointer rounded-none border-t-2 border-secondary dark:border-gray-700 ${dateRangeInDays > 7 ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={dateRangeInDays > 7}
                  >
                    Hour
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mx-auto flex w-full gap-2 overflow-x-auto px-20 py-10">
            {selectedOption === "1" ? (
              Array.isArray(allDataEsp) && esp.length > 0 ? (
                esp.map((espItem, index) => {
                  const borderColor = colorPalette[index % colorPalette.length];
                  return (
                    <div
                      className={`flex min-w-44 flex-col justify-start gap-y-2 rounded border-l-4 p-2 pl-5`}
                      key={index}
                      style={{ borderColor }}
                    >
                      <h2
                        className="text-left text-sm font-medium"
                        style={{ color: borderColor }}
                      >
                        ESP {index + 1}
                      </h2>
                      <h1 className="text-left text-xl font-semibold text-gray-800 dark:text-white">
                        {espItem.name}
                      </h1>
                    </div>
                  );
                })
              ) : (
                <h1></h1>
              )
            ) : (
              <h1></h1>
            )}
          </div>

          <div className="w-full pl-20 pt-10">
            <div className="flex items-center gap-2">
              {selectedEsp && selectedOption === "2" && (
                <div className="flex min-w-44 flex-col justify-start gap-y-2 rounded border-l-4 border-l-purple-600 p-2 pl-5">
                  <h2 className="text-left text-sm font-medium text-purple-600">
                    ESP 1
                  </h2>
                  <h1 className="text-left text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedEsp &&
                      esp.find(
                        (espItem) => espItem.id.toString() === selectedEsp,
                      )?.name}
                  </h1>
                </div>
              )}

              {selectedEsp2 && selectedOption === "2" && (
                <div className="flex min-w-44 flex-col justify-start gap-y-2 rounded border-l-4 border-l-yellow-600 p-2 pl-5">
                  <h2 className="text-left text-sm font-medium text-yellow-600">
                    ESP 2
                  </h2>
                  <h1 className="text-left text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedEsp2 &&
                      esp.find(
                        (espItem) => espItem.id.toString() === selectedEsp2,
                      )?.name}
                  </h1>
                </div>
              )}
            </div>
          </div>

          <CardContent className="sm:py-auto flex h-full w-full pb-6 max-2xl:flex-col 2xl:flex-row">
            <div className="flex w-1/2 flex-col justify-center gap-y-10 p-4 max-2xl:w-full 2xl:border-r-2">
              <h3 className="mx-auto flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                <CornerLeftDown /> Temperature
              </h3>

              <ResponsiveContainer width="100%" height={500}>
                <LineChart width={800} height={500} data={combinedData}>
                  <XAxis
                    fontSize={16}
                    tickLine={false}
                    axisLine={false}
                    dataKey="date"
                    stroke={textColor}
                    tickFormatter={(value: string) => {
                      const date = new Date(value);
                      return `${date.toLocaleDateString()}\n${date.toLocaleTimeString()}`;
                    }}
                    tick={{ fill: textColor, fontSize: 12, width: 75, dy: 10 }}
                    height={60}
                  />
                  <YAxis
                    fontSize={16}
                    tickLine={false}
                    axisLine={false}
                    stroke={textColor}
                    padding={{ top: 50, bottom: 10 }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)}`,
                      name,
                    ]}
                    labelFormatter={(label: string) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                    }}
                  />
                  <Legend />

                  {selectedOption === "1" ? (
                    Array.isArray(allDataEsp) &&
                    esp.length > 0 &&
                    esp.map((_, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={`avg_temperature[${index}]`}
                        stroke={colorPalette[index % colorPalette.length]}
                        strokeWidth="2px"
                        name={esp[index]?.name || `...`}
                      />
                    ))
                  ) : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="avg_temperature_esp1"
                        stroke="#9333ea"
                        strokeWidth="2px"
                        name={
                          esp.find(
                            (espItem) => espItem.id.toString() === selectedEsp,
                          )?.name || "ESP 1"
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="avg_temperature_esp2"
                        stroke="#ca8a04"
                        strokeWidth="2px"
                        name={
                          esp.find(
                            (espItem) => espItem.id.toString() === selectedEsp2,
                          )?.name || "ESP 2"
                        }
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex w-1/2 flex-col justify-center p-4 max-2xl:w-full">
              <h3 className="mx-auto flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Humidity <CornerRightDown />
              </h3>

              <ResponsiveContainer width="100%" height={500}>
                <LineChart width={800} height={500} data={combinedData}>
                  <XAxis
                    fontSize={16}
                    tickLine={false}
                    axisLine={false}
                    dataKey="date"
                    stroke={textColor}
                    tickFormatter={(value: string) => {
                      const date = new Date(value);
                      return `${date.toLocaleDateString()}\n${date.toLocaleTimeString()}`;
                    }}
                    tick={{ fill: textColor, fontSize: 12, width: 75, dy: 10 }}
                    height={60}
                  />
                  <YAxis
                    fontSize={16}
                    tickLine={false}
                    axisLine={false}
                    stroke={textColor}
                    padding={{ top: 50, bottom: 10 }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)}`,
                      name,
                    ]}
                    labelFormatter={(label: string) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                    }}
                  />
                  <Legend />
                  {selectedOption === "1" ? (
                    Array.isArray(allDataEsp) &&
                    esp.length > 0 &&
                    esp.map((_, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={`avg_humidity[${index}]`}
                        stroke={colorPalette[index % colorPalette.length]}
                        strokeWidth="2px"
                        name={esp[index]?.name || `...`}
                      />
                    ))
                  ) : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="avg_humidity_esp1"
                        stroke="#9333ea"
                        activeDot={{ r: 8 }}
                        strokeWidth="2px"
                        name={
                          esp.find(
                            (espItem) => espItem.id.toString() === selectedEsp,
                          )?.name || "ESP 1"
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="avg_humidity_esp2"
                        strokeWidth="2px"
                        stroke="#ca8a04"
                        name={
                          esp.find(
                            (espItem) => espItem.id.toString() === selectedEsp2,
                          )?.name || "ESP 2"
                        }
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
