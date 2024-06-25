import React, { useState } from "react";
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
}) {
  const temperature = useLastData("temperature", ip) ?? 0;
  const humidity = useLastData("humidity", ip) ?? 0;

  console.log(`Temperature for ${ip}:`, temperature);
  console.log(`Humidity for ${ip}:`, humidity);

  return (
    <Popover
      key={ip}
      open={hoveredCircle === ip}
      onOpenChange={(open) => setHoveredCircle(open ? ip : "")}
    >
      <PopoverTrigger asChild onClick={() => mouseClick(ip)}>
        <g id="icon-light" fill="currentcolor">
          <circle cx={cx} cy={cy} r="3" opacity="1" />
          <text x={cx - 4} y={cy + 6} className="text-[3px]">
            {temperature.toFixed(2) !== "pas de donnée"
              ? `${temperature.toFixed(2)} °C`
              : "pas de donnée"}
          </text>
          <text x={cx - 4} y={cy - 5} className="text-[3px]">
            {humidity.toFixed(2) !== undefined
              ? `${humidity.toFixed(2)} %`
              : "pas de donnée"}
          </text>
          <circle cx={cx} cy={cy} r="4" opacity=".3" />
          <circle cx={cx} cy={cy} r="6" opacity=".1" />
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
