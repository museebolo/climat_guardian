import { useEffect, useState } from 'react';
import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore, { AverageStore } from "./AverageStore.tsx";
import CardElement from "@/elements/CardElement.tsx";
import MonthAverageStore from "@/elements/MonthAverageStore.tsx";
import MonthElementData from "@/elements/MonthElementData.tsx";

export default function DashboardElement() {
    const d = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthSelected, setMonthSelected] = useState<string>(monthNames[d.getMonth()]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };

    useEffect(() => {
        setStartDate(null);
        setEndDate(null)
    }, [monthSelected]);


    return (
        <>
            <div className={`w-full justify-center align-middle justify-items-center `}>
                <div className="col-span-2">
                    <nav className="fixed w-full top-0 start-0">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex justify-center p-4">
                                <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 font-medium rounded-lg bg-white dark:bg-slate-800">
                                    {monthNames.map(month => (
                                        <li className="block py-2 px-3 text-black dark:text-white rounded"
                                            key={month}
                                            onClick={() => handleMonthClick(month)}>
                                            {month}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div>
                    <div className="flex flex-col md:flex-row text-center align-middle mt-12 gap-4">
                        <div className="md:w-1/2">
                            <input
                                className="bg-white font-bold h-12 pl-10 pr-8 w-full md:w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"

                                type="date"
                                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                onChange={e => setStartDate(new Date(e.target.value))}/>
                        </div>

                        <div className="md:w-1/2">
                            <input
                                className="bg-white font-bold h-12 pl-10 pr-8 w-full md:w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"
                                type="date"
                                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                onChange={e => setEndDate(new Date(e.target.value))}/>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 mr-5">
                            <CircularElementData/>
                        </div>
                        <div className="mt-6 md:mt-0">

                            <div className="mt-6 mb-3">
                                <MonthElementData/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mb-12">

                        <div className="">
                            <CardElement element={<MonthAverageStore select={monthSelected}/>}
                                         theme={`${monthSelected} Chart`}/>
                        </div>
                        <div className="">
                            {startDate && endDate ?
                                <CardElement
                                    theme={`${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`}
                                    element={<MonthlyAverageStore precision={'day'} beginning={startDate.toDateString()}
                                                                  end={endDate.toDateString()}/>}
                                /> : ""
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-row">
                    <AverageStore precision={'month'} beginning={'2024-01-01'} end={'2025-01-01'}/>
                </div>
            </div>
        </>
    )
}
