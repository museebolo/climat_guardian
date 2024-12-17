import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {getToken, user} from "@/lib/context";
import {Edit} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useFindIpById, {useAllUsers} from "@/lib/data";
import bcrypt from "bcryptjs";


export default function EditUsersData({username, password}: { username: string; password: string }) {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState("");

    const [confirm, setConfirm] = React.useState(false);

    const updateUsersData = async (newUsername: string, newPassword: string) => {


        const hashedPassword: string = await bcrypt.hash(newPassword, 10);

        const token = getToken();

        const editDatas = await fetch(`/postgrest/users?username=eq.${username}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: newUsername,
                password: hashedPassword
            }),
        });

        // window.location.href = `/dashboard/users`;

        if (editDatas.ok) {

            setMessage("Utilisateur modifié avec succé !")

        } else {

            setMessage("Erreur lors de la modification de l'utilisateur");

            const errorData = await editDatas.json();

            console.error(`An error occurred: ${editDatas.status}`, errorData);
            throw new Error(`An error occurred: ${editDatas.status}`);

        }

        console.log("Ancien username: " + username);
        console.log("Ancien password: " + password);
        console.log("Nouveau username: " + newUsername);
        console.log("Nouveau password: " + newPassword);

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
