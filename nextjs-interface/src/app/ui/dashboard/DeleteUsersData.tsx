import { useEffect, useState } from "react";
import { getToken, user } from "@/lib/context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllUsers } from "@/lib/data";

export default function DeleteUserData({ username }: { username: string }) {
  const [users, setUsers] = useState<user[]>([]);
  const allUsers = useAllUsers();

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  if (!allUsers) {
    return <div>Chargement...</div>;
  }

  // Fonction de suppression d'un utilisateur
  const handleDelete = async (username: string) => {
    try {
      const response = await fetch(`/postgrest/users?username=eq.${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        return;
      } else {
        window.location.href = "/dashboard/users";
      }

      // Remove user from local state after successful deletion
      setUsers(users.filter((user) => user.username !== username));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      <Popover>
        <PopoverTrigger>
          <Trash2 />
        </PopoverTrigger>

        <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
          <p>Supprimer cet utilisateur ?</p>
          <Button
            onClick={async () => {
              try {
                await handleDelete(username);
              } catch (e) {
                console.error(e);
              }
            }}
            className="w-72"
          >
            OUI
          </Button>
          <Button className="w-72">NON</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
