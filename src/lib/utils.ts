import { type ClassValue, clsx } from "clsx";
import Color from "color";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isValidColor = (color: string | undefined) => {
  if (!color) return false;

  try {
    Color(color);
    return true;
  } catch (_e: unknown) {
    return false;
  }
};

export const getValidColor = (color: string | undefined, fallback = "") => {
  return isValidColor(color) ? color : fallback;
};

export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const isJson = (file: File) => file.type === "application/json";

export function scrollToTop(elementRef: React.RefObject<HTMLElement>) {
  if (elementRef.current) {
    const scrollOptions: ScrollIntoViewOptions = {
      behavior: "smooth",
      block: "start",
    };
    elementRef.current.scrollIntoView(scrollOptions);
  }
}
