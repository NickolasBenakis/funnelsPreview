import { localStorage } from "@/lib/storage";
import { isJson } from "@/lib/utils";
import { waitFor } from "@/lib/utils";
import type { FunnelJSON } from "@/types/types";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export const STORAGE_KEY = "funnelJson";
export enum ErrorType {
  InvalidJsonSchema = "INVALID_JSON_SCHEMA",
  InvalidFileType = "INVALID_FILE_TYPE",
  NoFileDetected = "NO_FILE_DETECTED",
}

export const useFile = () => {
  const [funnelJson, setFunnelJson] = useState<FunnelJSON | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | undefined>(undefined);

  const onInputChange = async (file: File) => {
    setIsLoading(true);
    setError(undefined);

    await waitFor(500);
    if (!file || !isJson(file)) {
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (e) => {
      if (!e.target) return;
      try {
        const funnelJson = JSON.parse(e.target.result?.toString() || "");
        if (
          !funnelJson ||
          isEmpty(funnelJson.pages) ||
          !Array.isArray(funnelJson.pages)
        ) {
          setIsLoading(false);
          setError(ErrorType.InvalidJsonSchema);
          setFunnelJson(undefined);
          return;
        }

        setFunnelJson(funnelJson);
        await localStorage.setItem(STORAGE_KEY, funnelJson);
      } catch (_error) {
        setError(ErrorType.InvalidJsonSchema);
        setFunnelJson(undefined);
      } finally {
        setIsLoading(false);
      }
    };
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = Array.from(event.target.files || [])[0];
    onInputChange(file);
  };

  const onFileDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files: File[] = [];

    if (event?.dataTransfer?.items) {
      Array.from(event.dataTransfer.items).forEach((item) => {
        if (item.kind === "file") {
          files.push((item as any).getAsFile());
        }
      });
    } else {
      Array.from(event?.dataTransfer?.files || []).forEach((file) => {
        files.push(file);
      });
    }

    onInputChange(files[0]);
  };

  const onFileDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const onFileReset = () => {
    setError(undefined);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !funnelJson) {
      const funnelJson = localStorage.getItemSync<FunnelJSON>(STORAGE_KEY);
      setFunnelJson(funnelJson);
    }
  }, []);

  const onClearState = async () => {
    onFileReset();
    setIsLoading(false);
    setFunnelJson(undefined);
    await localStorage.removeItem(STORAGE_KEY);
  };

  return {
    funnelJson,
    isLoading,
    error,
    onFileChange,
    onFileReset,
    onFileDrop,
    onFileDragOver,
    onClearState,
  };
};
