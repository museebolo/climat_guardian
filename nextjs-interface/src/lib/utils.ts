import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Token copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy token: ", err);
    });
};

export function validateIp(ip: string): boolean {
  const ipRegex =
      /^(?:25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})){3}$/;
  return ipRegex.test(ip);
}
