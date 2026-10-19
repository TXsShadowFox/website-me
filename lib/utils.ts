import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Duplicates in 244K tasks" -> "duplicates in 244K tasks", for inline labels. */
export function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
