"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "recharts";

export default function EspLinksElement() {
  const pathname = usePathname();

  const [links, setLinks] = useState([
    { name: "chasseron", ip: "172.16.4.100" },
    { name: "pleiades", ip: "172.16.5.178" },
  ]);

  const [newLink, setNewLink] = useState({ name: "", ip: "" });

  const handleInputChange = (e: any) => {
    setNewLink({ ...newLink, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLinks([...links, newLink]);
    setNewLink({ name: "", ip: "" });
  };

  return (
    <>
      {links.map((link) => {
        const href = `/dashboard/esp/${link.name}`;
        return (
          <Link
            key={link.name}
            href={href}
            className={clsx(
              "flex items-center gap-3 rounded-lg text-sm text-zinc-500 transition-all hover:text-primary md:py-2",
              {
                "text-zinc-900": pathname === href,
              },
            )}
          >
            <p className="text-lg">{link.name}</p>
          </Link>
        );
      })}
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-zinc-500 hover:text-black">
            + ajouter un esp
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <Label>name</Label>
              <Input
                type="text"
                id="name"
                placeholder="name"
                value={newLink.name}
                onChange={handleInputChange}
              />

              <Label>ip adress</Label>
              <Input
                type="text"
                id="ip"
                placeholder="ip adresse"
                value={newLink.ip}
                onChange={handleInputChange}
              />
            </div>
            <Button
              className="mt-2 w-full bg-black text-white"
              type="submit"
              variant="outline"
            >
              ajouter un esp
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
