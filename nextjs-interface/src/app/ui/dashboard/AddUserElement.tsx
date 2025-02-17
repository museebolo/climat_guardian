import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken, user } from "@/lib/context";

import { userMessage } from "@/app/dashboard/message";


export function AddUserElement({
  users,
  setUsers,
  setMessage,
}: {
  users: user[];
  setUsers: Dispatch<SetStateAction<user[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const token = getToken();

    try {
      const response = await fetch(`/php/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const newUser: user = { username, password };
        setUsers([...users, newUser]);
        setMessage(userMessage.addUser);
        setUsername("");
        setPassword("");
      } else {
        setMessage(userMessage.errorAddUser);
      }
    } catch (error: any) {
      console.error("Erreur: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Input
          className="w-72"
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          className="w-72"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button onClick={handleAddUser}>Ajouter utilisateur</Button>
      </div>
    </div>
  );
}
