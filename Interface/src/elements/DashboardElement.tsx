import { useState } from 'react';
import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore, { AverageStore } from "./AverageStore.tsx";
import CardElement from "@/elements/CardElement.tsx";
import MonthAverageStore from "@/elements/MonthAverageStore.tsx";
import MonthElementData from "@/elements/MonthElementData.tsx";
import SideBarElement from "@/elements/SideBarElement.tsx";

export default function DashboardElement() {
    const d = new Date();
    const currentYear = d.getFullYear();
    const firstDayOfMonth = new Date(currentYear, d.getMonth(), 1);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthSelected, setMonthSelected] = useState<string>(monthNames[d.getMonth()]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };


    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
                <SideBarElement />
            </div>

            <div className="col-span-3">
                <nav className="w-full top-0 start-0">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex justify-center p-4">
                            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 font-medium rounded-lg ">
                                {monthNames.map(month => (
                                    <button className={`bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 font-medium rounded-xl dark:text-white text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 focus:outline-none dark:focus:ring-blue-800 ${month === monthSelected ? 'bg-blue-200' : ''}`}
                                            key={month}
                                            onClick={() => handleMonthClick(month)}>
                                        {month}
                                    </button>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col md:flex-row text-center align-middle gap-4 mt-12 ">
                    <div className="">
                        <input
                            value={startDate ? startDate.toISOString().split('T')[0] : ''}
                            className="bg-white font-bold h-12 pl-10 pr-8 w-full md:w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"
                            type="date"
                            onChange={e => setStartDate(new Date(e.target.value))} />
                    </div>

                    <div className="">
                        <input
                            className="bg-white font-bold h-12 pl-10 pr-8 w-full md:w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"
                            type="date"
                            value={endDate ? endDate.toISOString().split('T')[0] : ''}
                            onChange={e => setEndDate(new Date(e.target.value))} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="w-1/2 mr-5">
                        <CircularElementData />
                    </div>
                    <div className="w-1/2">
                        <MonthElementData />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row mb-12 space-x-8">

                    <div className="w-1/2">
                        <CardElement element={<MonthAverageStore select={monthSelected} />}
                                     theme={`${monthSelected} Chart`} />
                    </div>
                    <div className="w-1/2">
                        {startDate && endDate ?
                            <CardElement
                                theme={`${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`}
                                element={<MonthlyAverageStore precision={'day'} beginning={startDate.toDateString()}
                                                              end={endDate.toDateString()} />}
                            /> : ""
                        }

                    </div>
                </div>
                <div className="flex-row h-12">
                    <AverageStore precision={'month'} beginning={`${currentYear}-01-01`} end={`${currentYear + 1}-01-01`} />
                </div>

            </div>
        </div>
    )
}
