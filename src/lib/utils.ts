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

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available, then uses standard clipboard API, otherwise uses fallback
 *
 * Inspired by: https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
 * and https://forum.figma.com/t/write-to-clipboard-from-custom-plugin/11860/12
 *
 * @param content - The content to be copied to the clipboard
 */
export const copyToClipboard = (content: string) => {
  if (!content) {
    return;
  }

  // If the context is secure and clipboard API is available, use it
  if (
    window.isSecureContext &&
    typeof navigator?.clipboard?.writeText === "function"
  ) {
    navigator.clipboard.writeText(content);
  }
  // Otherwise, use the unsecured fallback
  else {
    unsecuredCopyToClipboard(content);
  }
  console.log(
    `${Math.round(content.length / 1000)}k characters copied to clipboard`,
  );
};

const unsecuredCopyToClipboard = (text: string) => {
  // Create a textarea element
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);

  // Focus and select the textarea content
  textArea.focus();
  textArea.select();

  // Attempt to copy the text to the clipboard
  const success = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!success) {
    throw new Error("Unable to copy content to clipboard!");
  }
};
