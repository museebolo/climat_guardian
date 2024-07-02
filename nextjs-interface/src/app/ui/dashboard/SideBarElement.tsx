// import ui components
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";

export default function SideBarElement() {
  return (
      <div className="hidden md:flex flex-col m-5 mt-0 border-r-2 border-b-2 h-full min-h-screen">
          <div>
              <NavLinksElement />
              <EspLinksElement />
          </div>
      </div>
  );
}
