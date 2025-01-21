import { Trash2 } from "lucide-react";
import { getToken } from "@/lib/context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function DeleteEsp({ id }: { id: string }) {
  const deleteEsp = async (id: string) => {
    // Get the id in the URL of the page

    const url = `/postgrest/rpc/delete_esp_data_and_esp`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          id_data: id,
        }),
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      window.location.href = `/dashboard`;

      if (!response.ok) {
        console.error(
          `Une erreur est survenue lors de la suppression de l'ESP`,
        );
        console.error(await response.json());
      } else {
        console.log("ESP supprimé avec succés");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      <Popover>
        <PopoverTrigger>
          <Trash2 />
        </PopoverTrigger>

        <PopoverContent className="mr-5 mt-2 flex w-fit flex-col gap-2 dark:bg-zinc-800">
          <p>Supprimer cet ESP ?</p>
          <Button
            onClick={async () => {
              try {
                await deleteEsp(id);
              } catch (e) {
                console.error(e);
              }
            }}
            className="w-72"
          >
            OUI
          </Button>
          <Button className="w-72">NON</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
