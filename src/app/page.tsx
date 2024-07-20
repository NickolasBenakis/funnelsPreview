"use client";
import ArtboardNode from "@/components/artboard-node";
import Dropzone from "@/components/dropzone";
import InvalidState from "@/components/invalid-state";
import MobileArtboard from "@/components/mobile-artboard";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Skeleton,
  SkeletonArtboard,
  SkeletonButton,
} from "@/components/ui/skeleton";
import useFile, { ErrorType } from "@/hooks/use-file";
import { cn, scrollToTop } from "@/lib/utils";
import { Plus } from "lucide-react";

import type React from "react";
import { useRef, useState } from "react";

const Home = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
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
      <div className="fixed h-full w-screen overflow-y-auto pb-16 sm:pl-[320px] transition-all duration-200 ease-in-out shadow-lg">
        <div className="p-4" id="canvas" data-testid="canvas" ref={canvasRef}>
          {isLoading && <SkeletonArtboard />}
          {!isLoading && error === ErrorType.InvalidJsonSchema && (
            <div className="p-4 rounded-md">
              <InvalidState />
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
                isVisible={currentPage === index + 1}
              >
                {page?.blocks?.map((block) => {
                  return <ArtboardNode key={block.id} block={block} />;
                })}
              </MobileArtboard>
            ))}
        </div>
      </div>

      <aside
        id="sidebar"
        className="fixed left-0 top-16 h-[calc(100%-64px)] w-80 py-2 overflow-y-auto overflow-x-hidden border-r hidden sm:block"
      >
        <div className="pt-2 px-4">
          <h2 className="text-2xl font-bold mb-4">Upload</h2>
          <Dropzone
            error={error}
            isLoading={isLoading}
            onFileChange={onFileChange}
            onFileReset={onFileReset}
            onFileDrop={onFileDrop}
            onFileDragOver={onFileDragOver}
          />
        </div>

        {isLoading && (
          <div className="p-4" data-testid="sidebar-skeleton">
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
              <h2 className="text-md my-4 truncate">{funnelJson.name}</h2>

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
                      scrollToTop(canvasRef);
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

      <Drawer>
        <DrawerTrigger
          asChild
          className="visible sm:hidden absolute bottom-[10%] right-[3%]"
        >
          <Button size="icon" variant="default" className="rounded-full">
            <Plus />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>
              <div className="pt-1 px-2">
                <Dropzone
                  error={error}
                  isLoading={isLoading}
                  onFileChange={onFileChange}
                  onFileReset={onFileReset}
                />
              </div>

              {!isLoading && funnelJson && (
                <>
                  <div className="p-2">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={onClearState}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="px-2">
                    <h2 className="text-lg font-bold my-2">Navigate</h2>
                  </div>
                  <ScrollArea className="flex flex-col gap-2 h-[100px] pl-2 pr-2">
                    {funnelJson?.pages?.map?.((page, index) => {
                      return (
                        <Button
                          key={`button-${page.id}`}
                          variant={
                            currentPage === index + 1 ? "default" : "ghost"
                          }
                          size="sm"
                          className={cn("w-full my-1")}
                          onClick={() => {
                            setCurrentPage(index + 1);
                            const element = document.getElementById(
                              `artboard-${index + 1}`,
                            );
                            if (element) {
                              element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
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
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default Home;
