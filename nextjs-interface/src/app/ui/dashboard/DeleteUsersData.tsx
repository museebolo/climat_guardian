import React, { useEffect, useState } from "react";
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
  // Function to hide the delete popup
  const [hidePopup, setHidePopup] = useState(false);

  const hidePopover = () => {
    setHidePopup(!hidePopup);

    console.log(hidePopup ? "Popover cachée" : "Popover affichée");
  };

  // Function to delete a user
  const [users, setUsers] = useState<user[]>([]);

  const handleDelete = async () => {
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
        // window.location.href = "/dashboard/users";
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

        {hidePopup && (
          <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
            <p>Supprimer {username} ?</p>
            <Button onClick={handleDelete} className="w-72">
              OUI
            </Button>
            <Button
              onClick={hidePopover}
              className="w-72 data-[state=closed]:animate-out"
            >
              NON
            </Button>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
