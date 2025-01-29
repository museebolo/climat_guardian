import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { getToken } from "@/lib/context";
import { Edit } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { userMessage } from "@/app/dashboard/message";
import bcrypt from "bcryptjs";

export default function EditUsersData({
                                        username,
                                        setUsername, // Ajout pour mise à jour dynamique
                                        setMessage,
                                      }: {
  username: string;
  setUsername: (newUsername: string) => void; // Fonction pour mettre à jour dynamiquement
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false); // Gère l'affichage du popover

  const updateUsersData = async () => {
    const token = getToken();

    const updateData: Record<string, string> = {};
    if (newUsername.trim() !== "") updateData.username = newUsername;
    if (newPassword.trim() !== "")
      updateData.password = await bcrypt.hash(newPassword, 10);

    if (Object.keys(updateData).length === 0) {
      setMessage("Aucune donnée à mettre à jour");
      return;
    }

    try {
      const response = await fetch(`/postgrest/users?username=eq.${username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setMessage(userMessage.editUser);
        if (newUsername) setUsername(newUsername); // Met à jour dynamiquement le username
        setNewUsername("");
        setNewPassword("");
        setOpen(false); // Ferme le popover après mise à jour
      } else {
        const errorData = await response.json();
        console.error(`An error occurred: ${response.status}`, errorData);
        setMessage(userMessage.errorEditUser);
      }
    } catch (error) {
      console.error(error);
      setMessage("Une erreur s'est produite lors de la modification.");
    }
  };

  return (
      <div className="flex cursor-pointer gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Edit className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
            <div className="flex flex-row gap-x-5">
              <Input
                  type="text"
                  placeholder="Nouveau nom d'utilisateur"
                  value={newUsername}
                  className="dark:bg-zinc-800"
                  onChange={(e) => setNewUsername(e.target.value)}
              />

              <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  className="dark:bg-zinc-800"
                  onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button
                  onClick={updateUsersData}
                  disabled={!newUsername && !newPassword} // Empêche l'envoi si rien n'est modifié
                  className="p-2 text-white dark:bg-zinc-700 dark:text-white dark:hover:bg-black"
              >
                Confirmer
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  );
}
