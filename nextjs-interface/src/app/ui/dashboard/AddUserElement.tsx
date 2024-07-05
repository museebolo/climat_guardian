import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/context";
import bcrypt from "bcryptjs";

export function AddUserElement() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
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
                setMessage("User added successfully!");
                setUsername(""); // Clear input fields after successful addition
                setPassword("");
            } else {
                setMessage("Failed to add user. Please try again."); // Handle other response statuses as needed
            }
        } catch (error:any) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
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
            {message && <p>{message}</p>}
        </div>
    );
}
