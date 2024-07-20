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
import { localStorage } from "@/lib/storage";
import { cn, isJson, waitFor } from "@/lib/utils";
import { FunnelJSON } from "@/types/types";
import React, { useEffect, useState } from "react";

import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const STORAGE_KEY = "funnelJson";

const Home = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [funnelJson, setFunnelJson] = useState<FunnelJSON | undefined>(
    undefined,
  );

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    await waitFor(500);

    const files = event.target.files;
    if (!files || files.length === 0) {
      setIsLoading(false);
      setError("No file selected");
      return;
    }

    const file = files[0];
    if (!isJson(file)) {
      setIsLoading(false);
      setError("Invalid file type");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target) return;
      try {
        const funnelJson = JSON.parse(e.target.result?.toString() || "");
        setFunnelJson(funnelJson);
        await localStorage.setItem(STORAGE_KEY, funnelJson);
      } catch (error) {
        setError("Invalid JSON file");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(files[0]);
    setFile(files[0]);
  };

  const onRemove = async () => {
    onFileReset();
    setFunnelJson(undefined);
    await localStorage.removeItem("funnelJson");
  };

  const onFileReset = () => {
    setFile(undefined);
    setError("");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !funnelJson) {
      const funnelJson = localStorage.getItemSync<FunnelJSON>(STORAGE_KEY);
      setFunnelJson(funnelJson);
    }
  }, []);

  const funnelJsonPages = funnelJson?.pages || [];

  return (
    <section className="fixed h-full w-screen overflow-auto">
      <div
        className="fixed h-full w-screen overflow-y-auto pb-16 pl-[320px] transition-all duration-200 ease-in-out shadow-lg"
        id="artboard-view"
      >
        {isLoading && <SkeletonArtboard />}
        {!isLoading && funnelJsonPages.length === 0 && (
          <div className="p-4">
            <Info
              heading="No pages found"
              subheading="Try to upload another json"
            />
            <JsonView
              data={funnelJsonPages}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
          </div>
        )}
        {!isLoading &&
          funnelJsonPages.length > 0 &&
          funnelJsonPages.map?.((page, index) => (
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
                onClick={onRemove}
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
