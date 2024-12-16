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

export default function EditUsersData({username, password}:{username: string; password: string}) {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = React.useState(false);

    const updateUsersData = async (newUsername: string, newPassword: string) => {

        const url = `/postgrest/users?username=eq.${username}`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({name: newUsername, password: newPassword}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`An error occurred: ${response.status}`, errorData);
            throw new Error(`An error occurred: ${response.status}`);
        } else {
            window.location.href = `/dashboard/users`;
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
