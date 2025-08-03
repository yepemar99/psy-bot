import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(text = "", cantidad = Infinity) {
  if (!text) return "";

  return text
    .trim()
    .split(/\s+/) // separa por espacios múltiples
    .slice(0, cantidad) // toma hasta 'cantidad' palabras
    .map((word) => word?.[0]?.toUpperCase() ?? "") // valida que exista y convierte
    .join("");
}
