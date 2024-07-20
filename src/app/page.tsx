"use client";
import ArtboardNode from "@/components/artboard-node";
import DropZone from "@/components/dropzone";
import Info from "@/components/info";
import MobileArtboard from "@/components/mobile-artboard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Skeleton,
  SkeletonArtboard,
  SkeletonButton,
} from "@/components/ui/skeleton";
import validJsonInputExample from "@/json/input1.json";
import { localStorage } from "@/lib/storage";
import { cn, isJson, waitFor } from "@/lib/utils";
import type { FunnelJSON } from "@/types/types";
import type React from "react";
import { useEffect, useState } from "react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export const STORAGE_KEY = "funnelJson";
export enum ErrorType {
  InvalidJsonSchema = "INVALID_JSON_SCHEMA",
  InvalidFileType = "INVALID_FILE_TYPE",
  NoFileDetected = "NO_FILE_DETECTED",
}

const Home = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [funnelJson, setFunnelJson] = useState<FunnelJSON | undefined>(
    undefined,
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | undefined>(undefined);

  console.log("funnelJson", funnelJson);
  console.log("file", file);
  console.log("error", error);
  console.log("isLoading", isLoading);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError(undefined);

    await waitFor(500);

    const files = event.target.files;
    if (!files || files.length === 0) {
      setIsLoading(false);
      setError(ErrorType.NoFileDetected);
      return;
    }

    const file = files[0];
    if (!isJson(file)) {
      setIsLoading(false);
      setError(ErrorType.InvalidFileType);
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (e) => {
      if (!e.target) return;
      try {
        console.log("raw", e.target.result);
        const funnelJson = JSON.parse(e.target.result?.toString() || "");
        if (!funnelJson) {
          setError(ErrorType.InvalidJsonSchema);
          setFile(undefined);
          return;
        }

        setFunnelJson(funnelJson);
        await localStorage.setItem(STORAGE_KEY, funnelJson);
      } catch (_error) {
        setError(ErrorType.InvalidJsonSchema);
        setFile(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    setFile(files[0]);
  };

  const onRemoveEverything = async () => {
    onFileReset();
    setIsLoading(false);
    setFunnelJson(undefined);
    localStorage.removeItemSync(STORAGE_KEY);
  };

  const onFileReset = () => {
    setFile(undefined);
    setError(undefined);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !funnelJson) {
      const funnelJson = localStorage.getItemSync<FunnelJSON>(STORAGE_KEY);
      setFunnelJson(funnelJson);
    }
  }, []);

  return (
    <section className="fixed h-full w-screen overflow-auto">
      <div
        className="fixed h-full w-screen overflow-y-auto pb-16 pl-[320px] transition-all duration-200 ease-in-out shadow-lg"
        id="artboard-view"
      >
        {isLoading && <SkeletonArtboard />}
        {!isLoading && error === ErrorType.InvalidJsonSchema && (
          <div className="p-4 rounded-md">
            <Info
              heading="Invalid json schema"
              subheading="Try to upload another json, similar to the json below 👇"
            />
            <JsonView
              data={validJsonInputExample}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
          </div>
        )}

        {!isLoading &&
          Array.isArray(funnelJson?.pages) &&
          funnelJson?.pages?.length > 0 &&
          funnelJson?.pages.map?.((page, index) => (
            <MobileArtboard
              key={page.id}
              id={`${index + 1}`}
              bgColor={funnelJson?.bgColor}
              name={funnelJson?.name}
            >
              {page?.blocks?.map((block) => {
                return <ArtboardNode key={block.id} block={block} />;
              })}
            </MobileArtboard>
          ))}
      </div>
      <aside
        id="sidebar"
        className="fixed left-0 top-16 h-[calc(100%-64px)] w-80 py-2 overflow-y-auto overflow-x-hidden border-r"
      >
        <div className="pt-2 px-4">
          <h2 className="text-2xl font-bold mb-4">Upload</h2>
          <DropZone
            file={file}
            error={error}
            isLoading={isLoading}
            onFileChange={onFileChange}
            onFileReset={onFileReset}
          />
        </div>

        {isLoading && (
          <div className="p-4">
            <Skeleton className="w-32 h-8 my-4" />
            <SkeletonButton className="w-full" />
            <Skeleton className="w-32 h-8 my-4" />
            <div className="flex flex-col gap-3">
              {[1, 2].map((skeleton) => {
                return (
                  <SkeletonButton
                    key={skeleton}
                    size="sm"
                    className={cn("w-full")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {!isLoading && funnelJson && (
          <>
            <div className="p-4">
              <h2 className="text-2xl font-bold my-4">Manage</h2>
              <Button
                variant="destructive"
                className="w-full"
                onClick={onRemoveEverything}
              >
                Remove
              </Button>
            </div>
            <div className="px-4">
              <h2 className="text-2xl font-bold my-4">Navigate</h2>
            </div>
            <ScrollArea className="flex flex-col gap-3 h-[200px] pl-4 pr-4">
              {funnelJson?.pages?.map?.((page, index) => {
                return (
                  <Button
                    key={`button-${page.id}`}
                    variant={currentPage === index + 1 ? "default" : "ghost"}
                    size="sm"
                    className={cn("w-full my-1")}
                    onClick={() => {
                      setCurrentPage(index + 1);
                      const element = document.getElementById(
                        `artboard-${index + 1}`,
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {`Page ${index + 1}`}
                  </Button>
                );
              })}
            </ScrollArea>
          </>
        )}
      </aside>
    </section>
  );
};

export default Home;
