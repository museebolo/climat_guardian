"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  const redirectToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>404 - Page introuvable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">L'ESP recherché n'existe pas</p>
          <Button onClick={redirectToDashboard} className="px-4 py-2">
            Retour à la page d'accueil
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
