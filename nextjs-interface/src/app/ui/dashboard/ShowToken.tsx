import React from "react";

import { copyToClipboard } from "@/lib/utils";
import { useFetchToken } from "@/lib/data";

export default function ShowToken(ip: any) {
  const newToken = useFetchToken(ip);
  copyToClipboard(newToken);

  return (
    <div className="mt-2 bg-zinc-200 p-2 text-sm dark:bg-zinc-800">
      Token copié !<br />
      {newToken}
    </div>
  );
}
