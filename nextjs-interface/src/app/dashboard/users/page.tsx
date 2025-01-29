"use client";
import React, { useState, useEffect } from "react";
import { useAllUsers } from "@/lib/data";
import { User, Trash2 } from "lucide-react";
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
import DeleteUsersData from "@/app/ui/dashboard/DeleteUsersData";
import {userMessage} from "@/app/dashboard/message";

export default function Page() {
  const [users, setUsers] = useState<user[]>([]);
  const allUsers = useAllUsers();

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const handleUserDelete = (username: string) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username),
    );
  };

  if (!allUsers) {
    return <div>Chargement...</div>;
  }

  // if (1 > 2) {
  //   setMessage(userMessage.editUser);
  // } else {
  //   setMessage(userMessage.errorEditUser);
  // }

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
                  password={user.password}
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
          <AddUserElement setUsers={setUsers} users={users} setMessage={setMessage}/>
          {message && <p className="mt-6 text-emerald-600">{message}</p>}
        </CardFooter>
      </Card>
    </>
  );
}
