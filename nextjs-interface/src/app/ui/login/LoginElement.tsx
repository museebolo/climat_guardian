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
import { SampleContext } from "@/lib/context";

export function LoginElement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(
      `${SampleContext.urlLogin}/login.php?username=${username}&password=${password}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((reponse) => {
        if (reponse.error) {
          setError(reponse.error);
        }
        if (reponse.token) {
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
    <div className="mt-80 flex justify-center">
      <form method="get" onSubmit={submit} className="mx-auto max-w-xs">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                value={username}
                autoComplete={"username"}
                onChange={(e) => setUsername(e.target.value)}
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
                id="password"
                type="password"
                placeholder="*****************"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full" type={"submit"}>
              Sign in
            </Button>
            <a
              href="/dashboard"
              className="w-full rounded-[7px] border-2 border-gray-800 p-2 text-center hover:bg-gray-800 hover:text-white"
            >
              Go to dashboard
            </a>
          </CardFooter>
        </Card>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default LoginElement;
