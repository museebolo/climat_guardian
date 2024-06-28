import SideBarElement from "@/app/ui/dashboard/SideBarElement";
import { HeaderElement } from "@/app/ui/dashboard/HeaderElement";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full dark:bg-gray-900">
      <HeaderElement />
      <div className="flex h-full flex-col md:flex-row">
        <div className="hidden w-full flex-none md:block md:w-64">
          <SideBarElement />
        </div>
        <div className="mx-4 flex w-full justify-stretch md:mx-5 md:mt-2 lg:ml-14">
          {children}
        </div>
      </div>
    </div>
  );
}
