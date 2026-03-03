// import ui components
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";

export default function SideBarElement() {
  return (
    <div className="ml-0 mr-0 hidden h-full min-h-screen flex-col border-b-2 border-r-2 md:flex">
      <div className="pr-5">
        <NavLinksElement />
        <EspLinksElement />
      </div>
    </div>
  );
}
