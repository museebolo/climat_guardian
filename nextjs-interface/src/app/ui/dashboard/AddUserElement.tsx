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
      const response = await fetch("http://localhost/postgrest/users", {
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
        setMessage("User added successfully!");
        setUsername("");
        setPassword("");
      } else {
        setMessage("Failed to add user. Please try again.");
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex">
        <Input
          className="w-72"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          className="w-72"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      {message && <p className="mt-6 text-emerald-600">{message}</p>}
    </div>
  );
}
