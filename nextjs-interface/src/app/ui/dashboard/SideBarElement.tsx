// import ui components
import NavLinksElement from "@/app/ui/dashboard/NavLinksElement";
import EspLinksElement from "@/app/ui/dashboard/EspLinksElement";

export default function SideBarElement() {
  return (
    <div className="mr-0 ml-0 hidden h-full min-h-screen flex-col border-r-2 border-b-2 md:flex">
      <div className="pr-5">
        <NavLinksElement />
        <EspLinksElement />
      </div>
    </div>
  );
}
