import React, { useState, useCallback } from "react";
import { useLastData } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/context";

export function EspMap({
  cx,
  cy,
  name,
  ip,
  hoveredCircle,
  setHoveredCircle,
  mouseClick,
}: {
  cx: number;
  cy: number;
  name: string;
  ip: string;
  hoveredCircle: string;
  setHoveredCircle: React.Dispatch<React.SetStateAction<string>>;
  mouseClick: (circle: string) => void;
}) {
  const [position, setPosition] = useState({ x: cx, y: cy });
  const temperature = useLastData("temperature", ip) ?? 0;
  const humidity = useLastData("humidity", ip) ?? 0;

  const mouseDown = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const initialPosition = { ...position };
      const speed = 0.1;

      const mouseMove = (moveEvent: { clientX: number; clientY: number }) => {
        const newX = initialPosition.x + (moveEvent.clientX - startX) * speed;
        const newY = initialPosition.y + (moveEvent.clientY - startY) * speed;
        setPosition({ x: newX, y: newY });

        setNewPosition({ x: newX, y: newY });
      };

      const mouseUp = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      };

      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    },
    [position],
  );

  const [newPosition, setNewPosition] = useState({ x: cx, y: cy });

  const updatePosition = async () => {
    const apiurl = `/postgrest/esp?ip=eq.${ip}`;

    const newData = {
      x: Math.round(newPosition.x),
      y: Math.round(newPosition.y),
    };

    try {
      const response = await fetch(apiurl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la mise à jour de la position: ${response.status} (${response.statusText})`,
        );
      }
    } catch (error) {
      console.error("error :", error);
    }
  };

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
            {temperature.toFixed(2) !== "Pas de donnée"
              ? `${temperature.toFixed(2)} °C`
              : "Pas de donnée"}
          </text>
          <text x={position.x - 4} y={position.y - 5} className="text-[3px]">
            {humidity.toFixed(2) !== undefined
              ? `${humidity.toFixed(2)} %`
              : "Pas de donnée"}
          </text>
          <circle cx={position.x} cy={position.y} r="4" opacity=".3" />
          <circle cx={position.x} cy={position.y} r="6" opacity=".1" />
        </g>
      </PopoverTrigger>
      <PopoverContent className="w-44 gap-4 font-bold dark:bg-zinc-800">
        <p className="pb-4 text-center text-lg">{name}</p>
        <Button
          className="w-full dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
          onClick={updatePosition}
        >
          Confirmer la position
        </Button>
      </PopoverContent>
    </Popover>
  );
}
