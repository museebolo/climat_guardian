import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { getToken } from "@/lib/context";
import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function RenameElement({ id }: { id: string }) {
  const [newName, setNewName] = useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [showToken, setShowToken] = useState(false);
  const token = getToken();

  const updateEspName = async (newName: string) => {
    const url = `/postgrest/esp?id=eq.${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name: newName }),
    });
    window.location.href = `/dashboard/esp/${id}`;
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`An error occurred: ${response.status}`, errorData);
      throw new Error(`An error occurred: ${response.status}`);
    } else {
    }
  };

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

  const toggleAndCopyToken = () => {
    setShowToken(!showToken);
    if (!showToken && token) {
      copyToClipboard(token);
    } else {
      return null;
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
          <div className="flex flex-row gap-x-5">
            <Input
              type="text"
              placeholder="modifier l'esp"
              value={newName}
              className="dark:bg-zinc-800"
              onChange={(e) => {
                setNewName(e.target.value);
                setConfirm(true);
              }}
            />
            {confirm && (
              <Button
                onClick={async () => {
                  try {
                    await updateEspName(newName);
                    setConfirm(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="p-2 text-white dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
              >
                Confirm
              </Button>
            )}
          </div>
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
                {token}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
