import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, {useState} from "react";
import {getToken} from "@/lib/context";

export default function RenameElement({name,id,ip}:{ name: string,id:string,ip:string }) {

    const [espName, setEspName] = useState(name);
    const [newName, setNewName] = useState("");
    const [confirm, setConfirm] = React.useState(false);
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
  return (
      <div className="flex gap-2">
          <Input
              type="text"
              placeholder="modifier l'esp"
              className="w-fit text-2xl font-bold text-black dark:bg-gray-900 dark:text-white"
              value={newName}
              onChange={(e) => {
                  setNewName(e.target.value);
                  setConfirm(true);
              }}
          />
          {confirm ? (
              <Button
                  onClick={async () => {
                      try {
                          await updateEspName(newName);
                          setConfirm(false);
                      } catch (e) {
                          console.error(e);
                      }
                  }}
                  className="p-2 text-white"
              >
                  Confirm edit
              </Button>
          ) : (
              ""
          )}
      </div>
  );
}
