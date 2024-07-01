import React, { useState, useCallback } from "react";
import { useLastData } from "@/lib/data";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function EspMap({
                           cx,
                           cy,
                           name,
                           ip,
                           hoveredCircle,
                           setHoveredCircle,
                           mouseClick,
                           deleteEsp,
                       }: {
    cx: number;
    cy: number;
    name: string;
    ip: string;
    hoveredCircle: string;
    setHoveredCircle: React.Dispatch<React.SetStateAction<string>>;
    mouseClick: (circle: string) => void;
    deleteEsp: (ip: string) => void;
})  {
    const [position, setPosition] = useState({ x: cx, y: cy });
    const temperature = useLastData("temperature", ip) ?? 0;
    const humidity = useLastData("humidity", ip) ?? 0;

    const mouseDown = useCallback((e: { clientX: number; clientY: number; }) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const initialPosition = { ...position };
        const speed = 0.1;

        const mouseMove = (moveEvent: { clientX: number; clientY: number; }) => {
            const newX = initialPosition.x + (moveEvent.clientX - startX) * speed;
            const newY = initialPosition.y + (moveEvent.clientY - startY) * speed;
            setPosition({ x: newX, y: newY });
            console.log(`New position for ${ip}: (${newX}, ${newY})`);
        };

        const mouseUp = () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    }, [position, ip]);

    return (
        <Popover
            key={ip}
            open={hoveredCircle === ip}
            onOpenChange={(open) => setHoveredCircle(open ? ip : "")}
        >
            <PopoverTrigger asChild onClick={() => mouseClick(ip)}>
                <g
                    id="icon-light"
                    fill="currentcolor"
                    onMouseDown={mouseDown}
                    style={{ cursor: "pointer" }}
                >
                    <circle cx={position.x} cy={position.y} r="3" opacity="1" />
                    <text x={position.x - 4} y={position.y + 6} className="text-[3px]">
                        {temperature.toFixed(2) !== "pas de donnée"
                            ? `${temperature.toFixed(2)} °C`
                            : "pas de donnée"}
                    </text>
                    <text x={position.x - 4} y={position.y - 5} className="text-[3px]">
                        {humidity.toFixed(2) !== undefined
                            ? `${humidity.toFixed(2)} %`
                            : "pas de donnée"}
                    </text>
                    <circle cx={position.x} cy={position.y} r="4" opacity=".3" />
                    <circle cx={position.x} cy={position.y} r="6" opacity=".1" />
                </g>
            </PopoverTrigger>
            <PopoverContent className="w-44 gap-4 font-bold">
                <p className="text-center">{name}</p>
                <Button className="w-full" onClick={() => deleteEsp(ip)}>
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}
