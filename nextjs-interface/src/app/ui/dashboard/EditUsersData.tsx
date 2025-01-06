import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {getToken} from "@/lib/context";
import {Edit} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import bcrypt from "bcryptjs";


export default function EditUsersData({username, password}: { username: string; password: string }) {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState("");

    const [confirm, setConfirm] = React.useState(false);

    const updateUsersData = async (newUsername: string, newPassword: string) => {
        const token = getToken();

        // Construire dynamiquement les données à envoyer
        const updateData: Record<string, string> = {};
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
            const response = await fetch(`/postgrest/users?username=eq.${username}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                setMessage("Utilisateur modifié avec succès !");
                window.location.href = `/dashboard/users`;
            } else {
                const errorData = await response.json();
                console.error(`An error occurred: ${response.status}`, errorData);
                setMessage("Erreur lors de la modification de l'utilisateur");
            }
        } catch (error) {
            console.error(error);
            setMessage("Une erreur s'est produite lors de la modification de l'utilisateur");
        }
    };



    return (
        <div className="flex cursor-pointer gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Edit/>
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
                                setConfirm(true)
                            }}
                        />

                        <Input
                            type="text"
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
