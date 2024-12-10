import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const copyToClipboard = (text: string) => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log("Token copié dans le clipboard");
            alert("Token copié")
        })
        .catch((err) => {
            console.error("Copie du Token échoué : ", err);
        });
};

export function validateIp(ip: string): boolean {
    const ipRegex =
        /^((25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[01]?\d{1,2})$/;
    return ipRegex.test(ip);
}
