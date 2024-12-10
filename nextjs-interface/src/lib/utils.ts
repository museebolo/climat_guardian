import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Fonction permettant la copie du Token
export const copyToClipboard = (text: string) => {

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log("Token copié dans le presse-papiers");
        }).catch((err) => {
            console.error("Erreur lors de la copie du token : ", err);
        });
    } else {
        console.log("Clipboard inaccessible...")
    }

};


export function validateIp(ip: string): boolean {
    const ipRegex =
        /^((25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[01]?\d{1,2})$/;
    return ipRegex.test(ip);
}