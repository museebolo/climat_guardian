"use client";
import React from "react";
import Link from "next/link";
import DarkModeToggle from "@/app/ui/all/DarkModeToggle";

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
  const darkModeSetting = localStorage.getItem('darkMode');

  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
  localStorage.clear();
  if (darkModeSetting) {
    localStorage.setItem('darkMode', darkModeSetting);
  }
};
export function HeaderElement() {
  return (
    <div className="flex flex-col">
      <header className="flex w-screen h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="flex flex-row gap-5 pt-5 lg:pt-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden dark:bg-slate-700"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col dark:bg-slate-800">
              <NavLinksElement />
              <EspLinksElement />
            </SheetContent>
          </Sheet>
          <div className="flex h-14 items-center lg:h-[60px] pb-4 lg:pb-0">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Landmark className="h-6 w-6" />
              <span className="">Musée Bolo</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <DarkModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full dark:bg-slate-700"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button className="w-full dark:bg-slate-700 dark:text-white" onClick={logout}>
                log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
