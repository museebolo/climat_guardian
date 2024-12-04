import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken, user } from "@/lib/context";
import bcrypt from "bcryptjs";

export function AddUserElement({
  users,
  setUsers,
}: {
  users: user[];
  setUsers: Dispatch<SetStateAction<user[]>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const token = getToken();

    try {
      const response = await fetch(`/postgrest/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
        }),
      });

      if (response.ok) {
        const newUser: user = { username, password: hashedPassword };
        setUsers([...users, newUser]);
        setMessage("Utilisateur ajouté avec succés !");
        setUsername("");
        setPassword("");
      } else {
        setMessage("Erreur à l'ajout 'un utilisateur. Veuillez réessayer.");
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
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
      {message && <p className="mt-6 text-emerald-600">{message}</p>}
    </div>
  );
}
