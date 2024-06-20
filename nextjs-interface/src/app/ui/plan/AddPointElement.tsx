import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function AddPointElement({
  newName,
  newIp,
  setNewName,
  setNewIp,
  cx,
  cy,
  setOpen,
  addEsp,
  open,
}: {
  newName: string;
  newIp: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewIp: React.Dispatch<React.SetStateAction<string>>;
  cx: number;
  cy: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addEsp: () => void;
  open: boolean;
}) {
  return (
    <Popover open={open}>
      <PopoverTrigger>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Ajouter un esp
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 gap-2 font-bold">
        <div>
          <div className="mb-2 text-center">
            <p>X: {Number(cx.toFixed(2))}</p>
            <p>Y: {Number(cy.toFixed(2))}</p>
          </div>
          <div className="mb-5">
            <Input
              className="mb-1"
              id="newname"
              type="text"
              placeholder="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="ip address"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={addEsp}>
            ajouter
          </Button>
          <Button
            className="mt-1 w-full border-2 bg-white text-black hover:text-white"
            onClick={() => setOpen(false)}
          >
            fermer
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
