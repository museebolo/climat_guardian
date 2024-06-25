"use client";
import React from "react";
import Link from "next/link";

// import shadcn ui components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUser, Landmark, Menu } from "lucide-react";

const logout = () => {
  window.location.href = "/";
  localStorage.clear();
};
export function HeaderElement() {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <NavLinksElement />
            <EspLinksElement />
          </SheetContent>
        </Sheet>
        <div className="flex h-14 items-center border-b lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Landmark className="h-6 w-6" />
            <span className="">Musée Bolo</span>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full md:absolute md:right-3"
            >
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button className="w-full" onClick={logout}>
              log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}
