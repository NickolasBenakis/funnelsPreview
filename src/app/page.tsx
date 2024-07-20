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
import { ErrorType, useFile } from "@/hooks/use-file";
import validJsonInputExample from "@/json/example.json";
import { cn } from "@/lib/utils";
import type React from "react";
import { useState } from "react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    funnelJson,
    isLoading,
    error,

    onFileChange,
    onFileReset,
    onFileDrop,
    onFileDragOver,
    onClearState,
  } = useFile();

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
            error={error}
            isLoading={isLoading}
            onFileChange={onFileChange}
            onFileReset={onFileReset}
            onFileDrop={onFileDrop}
            onFileDragOver={onFileDragOver}
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
              <h2 className="text-md my-4">{funnelJson.name}</h2>

              <Button
                variant="destructive"
                className="w-full"
                onClick={onClearState}
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
