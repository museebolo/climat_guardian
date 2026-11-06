"use client";

import React, { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/app/ui/all/DarkModeToggle";

export function LoginElement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/php/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((reponse) => {
        if (reponse.error) {
          setError(reponse.error);
        }
        if (reponse.token) {
          document.cookie = `token=${reponse.token}; path=/;`;
          localStorage.setItem("token", reponse.token);
          localStorage.setItem("username", username);
          window.location.replace(`/dashboard`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex h-screen items-center justify-center dark:bg-zinc-900">
      <form method="get" onSubmit={submit} className="mx-auto max-w-xs">
        <Card className="w-full max-w-lg dark:bg-zinc-800">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="flex items-center text-2xl">
                Login
              </CardTitle>
              <DarkModeToggle />
            </div>
            <CardDescription className="dark:text-white">
              Entrez votre nom d'utilisateur afin de vous connectez à votre
              compte
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                value={username}
                autoComplete={"username"}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary dark:bg-zinc-700"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary dark:bg-zinc-700"
                id="password"
                type="password"
                placeholder="*****************"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button
              className="w-full dark:bg-zinc-700 dark:text-white"
              type={"submit"}
            >
              S'identifier
            </Button>
          </CardFooter>
        </Card>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default LoginElement;
