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

    await fetch(`/php/login.php?username=${username}&password=${password}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    <div className="flex h-screen justify-center items-center dark:bg-slate-900">
      <form method="get" onSubmit={submit} className="mx-auto max-w-xs">
        <Card className="w-full max-w-lg dark:bg-gray-800">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="flex text-2xl items-center">Login</CardTitle>
              <DarkModeToggle />
            </div>
            <CardDescription className="dark:text-white">
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                value={username}
                autoComplete={"username"}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary dark:bg-slate-700"
                id="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary dark:bg-slate-700"
                id="password"
                type="password"
                placeholder="*****************"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full dark:bg-slate-700 dark:text-white" type={"submit"}>
              Sign in
            </Button>
          </CardFooter>
        </Card>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default LoginElement;
