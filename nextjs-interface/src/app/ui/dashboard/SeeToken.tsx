import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ShowToken from "@/app/ui/dashboard/ShowToken";

export default function SeeToken(ip: any) {
  const [showToken, setShowToken] = useState(false);

  const toggleToken = () => {setShowToken(!showToken)}

  return (
    <div>
      <Button
        onClick={toggleToken}
        className="p-2 text-white dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
      >
        {showToken ? "Cacher le Token" : "Afficher et Copier le Token"}
      </Button>
      {showToken && (
        <ShowToken ip={ip}/>
      )}
    </div>
  );
}
