"use client";
import React, { useState /*, useEffect*/ } from "react";
import { useAllUsers } from "@/lib/data";
import { User } from "lucide-react";
import { AddUserElement } from "@/app/ui/dashboard/AddUserElement";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { user } from "@/lib/context";
import EditUsersData from "@/app/ui/dashboard/EditUsersData";
import DeleteUsersData from "@/app/ui/dashboard/DeleteUsersData";

export default function Page() {
  const allUsers = useAllUsers();
  const [users, setUsers] = useState<user[]>(() => allUsers ?? []);

  const [message, setMessage] = useState("");

  if (users.length === 0 && Array.isArray(allUsers) && allUsers.length > 0) {
    setUsers(allUsers);
  }

  //useEffect(() => {
  //  if (allUsers) {
  //    setUsers(allUsers);
  //  }
  //}, [allUsers]);

  const handleUserDelete = (username: string) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username),
    );
  };

  const handleUserEdit = (username: string, editedUsername: Partial<user>) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username ? { ...user, ...editedUsername } : user,
      ),
    );
  };

  if (!allUsers) {
    return <div>Chargement...</div>;
  }

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
                <EditUsersData
                  username={user.username}
                  onChange={handleUserEdit}
                  setMessage={setMessage}
                />

                <DeleteUsersData
                  username={user.username}
                  onDelete={handleUserDelete}
                  setMessage={setMessage}
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex-col items-start">
          <AddUserElement
            setUsers={setUsers}
            users={users}
            setMessage={setMessage}
          />
          {message && <p className="mt-6 text-emerald-600">{message}</p>}
        </CardFooter>
      </Card>
    </>
  );
}
