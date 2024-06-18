// import ui components
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";

export default function SideBarElement() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 px-4 pt-2 lg:px-6">
          <div className="">
            <NavLinksElement />
            <EspLinksElement />
          </div>
        </div>
      </div>
    </div>
  );
}
