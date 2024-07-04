import SideBarElement from "@/app/ui/dashboard/SideBarElement";
import { HeaderElement } from "@/app/ui/dashboard/HeaderElement";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full border-2">
        <HeaderElement />
      </div>
      <div className="flex flex-row w-full pb-5 lg:pl-0 pl-5 pr-5 gap-x-5 dark:bg-zinc-900">
        <div className="hidden lg:block pl-5 w-1/6">
          <SideBarElement />
        </div>
        <div className="w-full pt-5 lg:w-5/6 dark:bg-zinc-900">
            {children}
        </div>
      </div>
    </>
  );
}
