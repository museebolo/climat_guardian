import React, {useEffect} from "react";

import {copyToClipboard} from "@/lib/utils";
import {useFetchToken} from "@/lib/data";

export default function ShowToken({ip}: { ip: string }) {

    const newToken = useFetchToken(ip);

    useEffect(() => {
            copyToClipboard(newToken);
        },
        [newToken]
    );

    return (
        <div className="mt-2 bg-zinc-200 p-2 text-sm dark:bg-zinc-800">
            Token copié !<br/>
            {newToken}
        </div>
    );


}