"use client";
import { useState, useEffect } from "react";
import { useAllUsers } from "@/lib/data";
import {User, Trash2, Edit} from "lucide-react";
import { AddUserElement } from "@/app/ui/dashboard/AddUserElement";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken, user } from "@/lib/context";
import EditUsersData from "@/app/ui/dashboard/EditUsersData";

export default function Page() {
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
        console.error("Erreur à la suppression de l'utilisateur");
        console.error(await response.json());
        return;
      }

      // Remove user from local state after successful deletion
      setUsers(users.filter((user) => user.username !== username));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tous les utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          {users.map((user, index) => (
            <div
              className="mb-4 flex items-center justify-between border-b border-gray-200"
              key={index}
            >

              <div className="mb-4 flex items-center gap-4">
                <User />
                <span className="text-lg font-bold">{user.username}</span>
              </div>

              <div className="mb-3 flex items-center gap-4">

                <EditUsersData />

                <Trash2
                    className="delete-icon cursor-pointer"
                    onClick={() => handleDelete(user.username)}
                />
              </div>

            </div>
          ))}
        </CardContent>
        <CardFooter>
          <AddUserElement setUsers={setUsers} users={users} />
        </CardFooter>
      </Card>
    </>
  );
}
