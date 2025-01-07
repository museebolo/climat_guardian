import { Trash2 } from "lucide-react";
import { getToken } from "@/lib/context";

export default function DeleteEsp({ id }: { id: string }) {
  const deleteEsp = async (id: string) => {
    // Get the id in the URL of the page
    const urlData = `/postgrest/data?esp_id=eq.${id}`;

    const url = `/postgrest/esp?id=eq.${id}`;

    try {
      const responseData = await fetch(urlData, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      window.location.href = `/dashboard`;

      if (!responseData.ok && !response.ok) {
        console.error(`une erreur lors de la suppression de l'ESP`);
        console.error(await responseData.json());
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      <Trash2 onClick={() => deleteEsp(id)} />
    </div>
  );
}
