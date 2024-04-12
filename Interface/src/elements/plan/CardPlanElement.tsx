import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function CardPlanElement({room}:{room:string}) {


    return (
        <>
            <Card className="bg-white p-4 dark:bg-slate-800 w-full mt-6">
                <div className="flex">
                    <CardHeader>
                        <CardTitle className="text-gray-500 dark:text-white">{room}</CardTitle>
                    </CardHeader>
                    <div className="mt-6 flex">
                        <div>
                            <p className="font-bold text-2xl ml-32 dark:text-white">
                                {12}°C
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-right ml-4 text-2xl dark:text-white">
                                {58}%
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
