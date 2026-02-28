import SideBarElement from "@/app/ui/dashboard/SideBarElement";
import { HeaderElement } from "@/app/ui/dashboard/HeaderElement";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full border-2">
        <HeaderElement />
      </div>
      <div className="flex w-full flex-row gap-x-5 pb-5 pl-5 pr-5 dark:bg-zinc-900 lg:pl-0">
        <div className="hidden w-1/6 pl-5 lg:block">
          <SideBarElement />
        </div>
        <div className="w-full pt-5 dark:bg-zinc-900 lg:w-5/6">{children}</div>
      </div>
    </>
  );
}
