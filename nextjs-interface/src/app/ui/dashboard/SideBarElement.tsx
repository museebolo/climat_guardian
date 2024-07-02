// import ui components
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";

export default function SideBarElement() {
  return (
      <div className="hidden md:flex flex-col mr-0 ml-0 border-r-2 border-b-2 h-full min-h-screen">
          <div className="pr-5">
              <NavLinksElement />
              <EspLinksElement />
          </div>
      </div>
  );
}
