"use-client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ErrorType } from "@/hooks/use-file";
import { cn } from "@/lib/utils";
import { Frown, Upload } from "lucide-react";
import React, { useRef, type ChangeEvent } from "react";

export type DropzoneProps = {
  error: ErrorType | undefined;
  isLoading: boolean;
  onFileChange: (file: ChangeEvent<HTMLInputElement>) => void;
  onFileReset?: () => void;
  onFileDrop?: (e: React.DragEvent<HTMLLabelElement>) => void;
  onFileDragOver?: (e: React.DragEvent<HTMLLabelElement>) => void;
};

const Dropzone: React.FC<DropzoneProps> = ({
  error,
  isLoading,
  onFileChange,
  onFileReset,
  onFileDrop,
  onFileDragOver,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInternalFileReset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (onFileReset) {
      onFileReset();
    }
  };

  return (
    <div
      id="dropzone-container"
      data-testid="dropzone-container"
      className={`
        overflow-y-auto 
        flex 
        flex-col 
        items-center 
        w-full relative 
        justify-center 
        h-40 
        border-2 
        border-dashed 
        rounded-lg
        transition-all
        duration-200
        `}
    >
      {!error && (
        <label
          onDrop={onFileDrop}
          onDragOver={onFileDragOver}
          onDragEnter={(e) =>
            e.currentTarget.classList.replace("bg-gray-50", "bg-gray-100")
          }
          onDragLeave={(e) =>
            e.currentTarget.classList.replace("bg-gray-100", "bg-gray-50")
          }
          htmlFor="dropzone-file"
          aria-disabled={isLoading}
          className={cn(
            "flex flex-col w-full justify-center h-40 items-center border-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100",
            isLoading
              ? "pointer-events-none cursor-default"
              : "pointer-events-auto cursor-pointer",
          )}
        >
          {isLoading && (
            <React.Fragment>
              <div className="flex flex-col gap-3 items-center justify-start pt-5 pb-6">
                <Spinner size="medium" className="w-8 h-8" />
                <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  Uploading file...
                </p>
              </div>
            </React.Fragment>
          )}

          {!isLoading && (
            <div className="flex flex-col gap-3 items-center justify-center pt-5 pb-6">
              <Upload
                strokeWidth={1.5}
                className="w-8 h-8 text-gray-500 dark:text-gray-400"
              />
              <div>
                <p className="text-md font-semibold text-gray-500 dark:text-gray-400">
                  Upload a funnel json
                </p>
                <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  or drag and drop here
                </p>
              </div>
            </div>
          )}

          <input
            id="dropzone-file"
            data-testid="dropzone-file"
            type="file"
            className="hidden"
            multiple={false}
            accept="application/json"
            onChange={onFileChange}
            ref={inputRef}
          />
        </label>
      )}

      {error && (
        <div className="flex flex-col gap-3 w-full justify-center h-40 items-center bg-gray-100 border-gray-400">
          <Frown size={32} strokeWidth={1.5} />
          <div className="flex flex-col gap-3 items-center justify-start">
            <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
              {error === ErrorType.InvalidFileType &&
                "Invalid File type, use .json files only"}
              {error === ErrorType.InvalidJsonSchema &&
                "Invalid JSON schema, try again"}
              {error === ErrorType.NoFileDetected &&
                "No File detected, try again"}
            </p>
            <Button
              onClick={onInternalFileReset}
              variant="default"
              size="sm"
              data-test-id="try-again"
            >
              Try again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
