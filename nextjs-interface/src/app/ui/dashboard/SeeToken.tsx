import { getToken } from "@/lib/context";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useFetchToken } from "@/lib/data";

export default function SeeToken(ip: any) {
  const [showToken, setShowToken] = useState(false);
  const token = getToken();
  const newToken = useFetchToken(ip);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Token copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy token: ", err);
      });
  };

  const toggleAndCopyToken = async () => {
    console.log(newToken);
    setShowToken(!showToken);
    if (!showToken && token) {
      copyToClipboard(newToken);
    } else {
      return null;
    }
  };

  return (
    <div>
      <Button
        onClick={toggleAndCopyToken}
        className="p-2 text-white dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
      >
        {showToken ? "Cacher le Token" : "Afficher et Copier le Token"}
      </Button>
      {showToken && (
        <div className="mt-2 bg-zinc-200 p-2 text-sm dark:bg-zinc-800">
          Token copier !: <br />
          {newToken}
        </div>
      )}
    </div>
  );
}
