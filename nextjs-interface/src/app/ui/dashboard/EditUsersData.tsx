import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { getToken, user } from "@/lib/context";
import { Edit } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import bcrypt from "bcryptjs";

import { userMessage } from "@/app/dashboard/message";

export default function EditUsersData({
  username,
  onChange,
  setMessage,
}: {
  username: string;
  onChange: (username: string, editedUsername: Partial<user>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [open, setOpen] = useState(false);

  const [confirm, setConfirm] = React.useState(false);

  const updateUsersData = async (newUsername: string, newPassword: string) => {
    const token = getToken();

    // Construire dynamiquement les données à envoyer
    const updateData: Partial<any> = {};
    if (newUsername.trim() !== "") {
      updateData.username = newUsername;
    }
    if (newPassword.trim() !== "") {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // Vérifier qu'il y a au moins une donnée à mettre à jour
    if (Object.keys(updateData).length === 0) {
      setMessage("Aucune donnée à mettre à jour");
      return;
    }

    try {
      const response = await fetch(`/users?username=eq.${username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setMessage(userMessage.editUser);
        setNewUsername("");
        setNewPassword("");
        setOpen(false);

        onChange(username, updateData);
      } else {
        setMessage(userMessage.errorEditUser);
      }
    } catch (error: any) {
      console.error("Erreur: " + error.message);
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Edit />
        </PopoverTrigger>
        <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
          <div className="flex flex-row gap-x-5">
            <Input
              type="text"
              placeholder="Nouveau nom d'utilisateur"
              value={newUsername}
              className="dark:bg-zinc-800"
              onChange={(e) => {
                setNewUsername(e.target.value);
                setConfirm(true);
              }}
            />

            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              className="dark:bg-zinc-800"
              onChange={(e) => {
                setNewPassword(e.target.value);
                setConfirm(true);
              }}
            />

            {confirm && (
              <Button
                onClick={async () => {
                  try {
                    await updateUsersData(newUsername, newPassword);
                    setConfirm(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="p-2 text-white dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
              >
                Confirmer
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
