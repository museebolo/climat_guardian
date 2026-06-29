import { Suspense } from "react";
// import components
//import DataCircle from "@/app/ui/dashboard/DataCircle";
import DataGraph from "@/app/ui/dashboard/DataGraph";
//import { useAllEsp } from "@/lib/data";
import EspList from "@/app/ui/dashboard/EspList";

export default function Page() {
  return (
    <>
      <div>
        <Suspense fallback={<div>Chargement...</div>}>
          <DataGraph />
        </Suspense>
      </div>

      <br />

      <EspList />
    </>
  );
}
