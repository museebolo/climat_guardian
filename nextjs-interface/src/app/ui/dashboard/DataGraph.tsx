import {ChartElement} from "@/app/ui/dashboard/ChartElement";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import React, {PureComponent, useContext, useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import useFindIpById, {
    calculateAverage,
    GetEspPosition, useAllEsp, useFetchAllData,
    useFetchData,
    useLastData,
} from "@/lib/data";
import {differenceInDays, endOfWeek, format, startOfWeek} from "date-fns";
import {DateRange} from "react-day-picker";
import {DateRangeElement} from "@/app/ui/dashboard/DateRangeElement";
import {useRouter, useSearchParams} from "next/navigation";
import {Check, CornerLeftDown, CornerRightDown} from "lucide-react";
import {ThemeContext} from "@/lib/Theme";
import {avgData} from "@/lib/context";


export default function DataGraph() {
    const [date, setDate] = useState<DateRange | undefined>(() => {
        const now = new Date();
        return {
            from: startOfWeek(now),
            to: endOfWeek(now),
        };
    });


    const [selectedEsp, setSelectedEsp] = useState<string | undefined>(undefined);
    const [selectedEsp2, setSelectedEsp2] = useState<string | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<string>('1');

    const dateRangeInDays =
        date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;

    const ip1 = useFindIpById(selectedEsp ? selectedEsp : "");
    const ip2 = useFindIpById(selectedEsp2 ? selectedEsp2 : "");

    const temperature1 = useLastData("temperature", ip1);
    const humidity1 = useLastData("humidity", ip1);

    const temperature2 = useLastData("temperature", ip2);
    const humidity2 = useLastData("humidity", ip2);

    const router = useRouter();
    const searchParams = useSearchParams();


    const from = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const to = date?.to ? format(date.to, "yyyy-MM-dd") : "";
    const [precision, setPrecision] = useState("Day");
    const esp = useAllEsp();


    let allDataEsp1: avgData[] | null = useFetchData(precision, ip1, from, to);
    let allDataEsp2: avgData[] | null = useFetchData(precision, ip2, from, to);


    const combinedDataMap = new Map<string, any>();

    const allDataEsp = useFetchAllData(precision, from, to);


    if (selectedOption === '1' && Array.isArray(allDataEsp)) {
        allDataEsp.forEach(data => {
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
            allDataEsp1.forEach(data => {
                combinedDataMap.set(data.date, {
                    ...data,
                    avg_temperature_esp1: data.avg_temperature,
                    avg_humidity_esp1: data.avg_humidity
                });
            });
        }

        if (Array.isArray(allDataEsp2)) {
            allDataEsp2.forEach(data => {
                if (combinedDataMap.has(data.date)) {
                    const existingData = combinedDataMap.get(data.date);
                    combinedDataMap.set(data.date, {
                        ...existingData,
                        avg_temperature_esp2: data.avg_temperature,
                        avg_humidity_esp2: data.avg_humidity
                    });
                } else {
                    combinedDataMap.set(data.date, {
                        ...data,
                        avg_temperature_esp2: data.avg_temperature,
                        avg_humidity_esp2: data.avg_humidity
                    });
                }
            });
        }
    }


    const combinedData = Array.from(combinedDataMap.values());

    function setDataToDisplay(data: any) {
        console.log("les datas en dessous")
        console.log(data);

    }


    const dataToDisplay = selectedOption === '1' ? allDataEsp : combinedData;


    const {darkMode} = useContext(ThemeContext);
    let textColor = darkMode ? "white" : "";



    useEffect(() => {
        const esp1 = searchParams.get("esp1");
        const esp2 = searchParams.get("esp2");

        if (esp1) setSelectedEsp(esp1);
        if (esp2) setSelectedEsp2(esp2);
    }, [searchParams]);

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
    }, [selectedEsp, selectedEsp2, selectedOption, precision, dateRangeInDays, router]);



    const handleDateChange = (newDate: DateRange | undefined) => {
        const from = newDate?.from ? newDate.from.toISOString() : "";
        const to = newDate?.to ? newDate.to.toISOString() : "";

        router.push(
            `?precision=${precision}&from=${from}&to=${to}`,
        );
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
        "#17becf"  // Bleu-vert
    ];


    /*
        const allData = useFetchData(precision, "1", from, to);
    */

    return (
        <>

            <Card className="flex h-fit w-full flex-col items-center text-center dark:border-zinc-700 dark:bg-zinc-900">
                <CardTitle
                    className="w-full border-b-2 pb-5 pt-5 text-center text-gray-800 dark:border-zinc-700 dark:text-white">
                    <h3>
                        Comparison of Temperature and Humidity
                        <span
                            className="text-gray-400 font-normal italic">(From {from || "..."} to {to || "..."} )</span>
                    </h3>
                </CardTitle>


              {/*  <details className="flex w-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <summary>Esp1 données <span
                        className="text-gray-400 dark:text-gray-400">(selectionné)</span> : <span
                        className="font-bold text-red-600 dark:text-red-400">{allDataEsp1.length}</span></summary>
                    <div>
                        <h1 className="border-b-2 pb-2 mb-2 bg-blue-100 dark:bg-blue-900 w-full">
                            {allDataEsp1 && allDataEsp1.length > 0 ? (
                                <ul>
                                    {allDataEsp1.map((dataItem, index) => (
                                        <li key={index}>{JSON.stringify(dataItem)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune donnée disponible esp1</p>
                            )}
                        </h1>
                    </div>
                </details>

                <details className="flex w-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <summary>Esp2 données <span
                        className="text-gray-400 dark:text-gray-400">(selectionné)</span> : <span
                        className="font-bold text-red-600 dark:text-red-400">{allDataEsp2.length}</span></summary>
                    <div>
                        <h1 className="border-b-2 pb-2 mb-2 bg-red-100 dark:bg-red-900 w-full">
                            {allDataEsp2 && allDataEsp2.length > 0 ? (
                                <ul>
                                    {allDataEsp2.map((dataItem, index) => (
                                        <li key={index}>{JSON.stringify(dataItem)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune donnée disponible esp2</p>
                            )}
                        </h1>
                    </div>
                </details>

                <details className="flex w-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <summary>données combined : <span
                        className="font-bold text-red-600 dark:text-red-400"> {combinedData.length}</span></summary>
                    <div>
                        <h1 className="border-b-2 pb-2 mb-2 bg-purple-100 dark:bg-purple-900 w-full">
                            {combinedData && combinedData.length > 0 ? (
                                <ul>
                                    {combinedData.map((dataItem, index) => (
                                        <li key={index}>{JSON.stringify(dataItem)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune donnée disponible pour le combined</p>
                            )}
                        </h1>
                    </div>
                </details>

                <details className="flex w-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <summary>donneés de tout les esp : <span
                        className="font-bold text-red-600 dark:text-red-400">{allDataEsp.length}</span></summary>
                    <div>
                        <h1 className="border-b-2 pb-2 mb-2 bg-green-100 dark:bg-green-900 w-full">
                            {allDataEsp && allDataEsp.length > 0 ? (
                                <ul>
                                    {allDataEsp.map((dataItem, index) => (
                                        <li key={index}>{JSON.stringify(dataItem)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune donnée disponible pour tout les eps</p>
                            )}
                        </h1>
                    </div>
                </details>

                <details className="flex w-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <summary>dataToDisplay: <span
                        className="font-bold text-red-600 dark:text-red-400">{dataToDisplay.length}</span></summary>
                    <div>
                        <h1 className="border-b-2 pb-2 mb-2 bg-yellow-100 dark:bg-yellow-900 w-full">
                            {dataToDisplay && dataToDisplay.length > 0 ? (
                                <ul>
                                    {dataToDisplay.map((dataItem, index) => (
                                        <li key={index}>{JSON.stringify(dataItem)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune donnée pour dataToDisplay</p>
                            )}
                        </h1>
                    </div>
                </details>*/}


                <style jsx>{`

                `}</style>


                <div
                    className="flex p-6 w-full items-center gap-2 overflow-x-auto overflow-y-auto max-h-full">

                    <div className="flex items-center w-fit">
                        <Select onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
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
                                <SelectItem value="1" className="cursor-pointer bg-white dark:bg-zinc-900">
                                    Comparer tout les esp
                                </SelectItem>
                                <SelectItem value="2" className="cursor-pointer bg-white dark:bg-zinc-900">
                                    Comparer deux esp
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedOption === '2' && (
                        <div className="flex gap-2 rounded">
                            <div className="w-fit flex gap-2 items-center">
                                <Select onValueChange={(value) => setSelectedEsp(value)} value={selectedEsp}
                                >
                                    <SelectTrigger
                                        id="select-precision"
                                        className="w-[200px] border-purple-600 bg-purple-50 dark:bg-purple-900"
                                    >
                                        <SelectValue placeholder="..." >


                                            {esp.find((espItem) => espItem.id.toString() === selectedEsp)?.name || '...'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        className="flex w-60 gap-2 dark:bg-zinc-800"
                                    >
                                        {esp
                                            .filter((espItem) => espItem.id.toString() !== selectedEsp2)
                                            .map((espItem) => (
                                                <SelectItem key={espItem.id} value={espItem.id.toString()} className="cursor-pointer">
                                                    {espItem.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                               {/* <Select onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
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
                                        <SelectItem value="1" className="cursor-pointer bg-white dark:bg-zinc-900">
                                            Comparer tout les esp
                                        </SelectItem>
                                        <SelectItem value="2" className="cursor-pointer bg-white dark:bg-zinc-900">
                                            Comparer deux esp
                                        </SelectItem>
                                    </SelectContent>
                                </Select>*/}
                            </div>

                            <div className="flex items-center">
                                <Select onValueChange={(value) => setSelectedEsp2(value)} value={selectedEsp2}>
                                    <SelectTrigger
                                        id="select-precision"
                                        className="w-[200px] border-yellow-600 bg-yellow-50 dark:bg-yellow-900"
                                    >
                                        <SelectValue placeholder="...">
                                            {esp.find((espItem) => espItem.id.toString() === selectedEsp2)?.name || '...'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        className="flex w-60 gap-2 dark:bg-zinc-800"
                                    >
                                        {esp
                                            .filter((espItem) => espItem.id.toString() !== selectedEsp)
                                            .map((espItem) => (
                                                <SelectItem key={espItem.id} value={espItem.id.toString()} className="cursor-pointer">
                                                    {espItem.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    {selectedOption === '1' && (
                        <div className=" ">
                            <h1 className="bg-green-100 rounded flex items-center gap-2 border-green-400 border p-2 font-semibold text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-white">
                                <Check/> Comparer tout les esp
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

                    <div className="w-fit ">
                        <Select onValueChange={handleSelect}>
                            <SelectTrigger
                                id="select-precision"
                                className="w-fit dark:border-zinc-700 dark:bg-zinc-900"
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

                <div className="w-full pl-20 pt-10">
                    <div className="flex items-center gap-2">
                        {selectedEsp && selectedOption === '2' && (
                            <div
                                className="flex min-w-44 flex-col justify-start p-2 gap-y-2 border-l-4 border-l-purple-600  pl-5 rounded">
                                <h2 className="text-sm font-medium text-purple-600 text-left">ESP 1</h2>
                                <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-left">
                                    {selectedEsp && esp.find((espItem) => espItem.id.toString() === selectedEsp)?.name}
                                </h1>
                            </div>)}
    
                        {selectedEsp2 && selectedOption === '2' && (
                            <div
                                className="flex min-w-44 flex-col justify-start p-2 gap-y-2 border-l-4 border-l-yellow-600 pl-5 rounded">
                                <h2 className="text-sm font-medium text-yellow-600 text-left">ESP 2</h2>
                                <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-left">
                                    {selectedEsp2 && esp.find((espItem) => espItem.id.toString() === selectedEsp2)?.name}
                                </h1>
                            </div>)}


                        {selectedOption === '1' ? (
                            Array.isArray(allDataEsp) && esp.length > 0 ? (
                                esp.map((espItem, index) => {
                                    const borderColor = colorPalette[index % colorPalette.length];
                                    return (
                                        <div
                                            className={`flex min-w-44 flex-col justify-start p-2 gap-y-2 border-l-4 pl-5 rounded`}
                                            key={index}
                                            style={{borderColor}}
                                        >
                                            <h2 className="text-sm font-medium text-left" style={{color: borderColor}}>
                                                ESP {index + 1}
                                            </h2>
                                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-left">
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
                </div>




                <CardContent className="sm:py-auto flex h-full w-full 2xl:flex-row pb-6 max-2xl:flex-col">


                    <div className="w-1/2 max-2xl:w-full gap-y-10 flex justify-center flex-col border-r-2 p-4">
                        <h3 className="flex items-center mx-auto gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                            <CornerLeftDown/> Temperature
                        </h3>

                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart
                                width={800}
                                height={500}
                                data={combinedData}
                            >
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
                                    tick={{fill: textColor, fontSize: 12, width: 75, dy: 10}}
                                    height={60}
                                />
                                <YAxis
                                    fontSize={16}
                                    tickLine={false}
                                    axisLine={false}
                                    stroke={textColor}
                                    padding={{top: 50, bottom: 10}}
                                />
                                <Tooltip
                                    formatter={(value: number, name: string) => [`${value.toFixed(2)}`, name]}
                                    labelFormatter={(label: string) => {
                                        const date = new Date(label);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                                    }}
                                />
                                <Legend/>

                                {selectedOption === '1' ? (
                                    Array.isArray(allDataEsp) && esp.length > 0 && esp.map((_, index) => (
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
                                            name={esp.find((espItem) => espItem.id.toString() === selectedEsp)?.name || 'ESP 1'}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="avg_temperature_esp2"
                                            stroke="#ca8a04"
                                            strokeWidth="2px"
                                            name={esp.find((espItem) => espItem.id.toString() === selectedEsp2)?.name || 'ESP 2'}
                                        />
                                    </>
                                )}

                            </LineChart>
                        </ResponsiveContainer>

                    </div>

                    <div className="w-1/2 max-2xl:w-full flex justify-center flex-col p-4">
                        <h3 className="flex items-center mx-auto gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Humidity <CornerRightDown/>
                        </h3>

                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart
                                width={800}
                                height={500}
                                data={combinedData}
                            >
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
                                    tick={{fill: textColor, fontSize: 12, width: 75, dy: 10}}
                                    height={60}
                                />
                                <YAxis
                                    fontSize={16}
                                    tickLine={false}
                                    axisLine={false}
                                    stroke={textColor}
                                    padding={{top: 50, bottom: 10}}
                                />
                                <Tooltip
                                    formatter={(value: number, name: string) => [`${value.toFixed(2)}`, name]}
                                    labelFormatter={(label: string) => {
                                        const date = new Date(label);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                                    }}
                                />
                                <Legend/>
                                {selectedOption === '1' ? (
                                    Array.isArray(allDataEsp) && esp.length > 0 && esp.map((_, index) => (
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
                                            activeDot={{r: 8}}
                                            strokeWidth="2px"
                                            name={esp.find((espItem) => espItem.id.toString() === selectedEsp)?.name || 'ESP 1'}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="avg_humidity_esp2"
                                            strokeWidth="2px"
                                            stroke="#ca8a04"
                                            name={esp.find((espItem) => espItem.id.toString() === selectedEsp2)?.name || 'ESP 2'}
                                        />
                                    </>
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>


        </>
    );
}