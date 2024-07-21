"use client";
import ArtboardNode from "@/components/artboard-node";
import Dropzone from "@/components/dropzone";
import InvalidState from "@/components/invalid-state";
import MobileArtboard from "@/components/mobile-artboard";
import MobileViewNavigation from "@/components/mobile-view-navigation";
import MobileViewUpload from "@/components/mobile-view-upload";
import SidebarSkeleton from "@/components/sidebar-skeleton";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SkeletonArtboard } from "@/components/ui/skeleton";
import useFile, { ErrorType } from "@/hooks/use-file";
import { ArrowDown, ArrowUp } from "lucide-react";

import type React from "react";
import { useRef } from "react";

const Home = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const {
    funnelJson,
    isLoading,
    error,

    currentFunnelPage,
    onFunnelPageChange,

    onFileChange,
    onFileReset,
    onFileDrop,
    onFileDragOver,

    onClearState,
  } = useFile();

  return (
    <section className="fixed h-full w-screen overflow-auto">
      <div className="fixed h-full w-screen overflow-auto pb-16 sm:pl-[320px]">
        <div
          className="p-4 bg-gray-50 min-h-[100vh] h-auto"
          id="canvas"
          data-testid="canvas"
          ref={canvasRef}
        >
          {isLoading && <SkeletonArtboard />}
          {!isLoading && error === ErrorType.InvalidJsonSchema && (
            <InvalidState />
          )}

          {!isLoading &&
            Array.isArray(funnelJson?.pages) &&
            funnelJson?.pages?.length > 0 &&
            funnelJson?.pages.map?.((page, index) => (
              <MobileArtboard
                key={page.id}
                id={`${index + 1}`}
                bgColor={funnelJson?.bgColor}
                isVisible={currentFunnelPage === index + 1}
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

        {isLoading && <SidebarSkeleton />}

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
                    variant={
                      currentFunnelPage === index + 1 ? "default" : "ghost"
                    }
                    size="sm"
                    className="w-full my-1"
                    onClick={() => onFunnelPageChange(index + 1)}
                  >
                    {`Page ${index + 1}`}
                  </Button>
                );
              })}
            </ScrollArea>
          </>
        )}
      </aside>

      <MobileViewUpload
        isLoading={isLoading}
        funnelJson={funnelJson}
        currentFunnelPage={currentFunnelPage}
        onFunnelPageChange={onFunnelPageChange}
        onClearState={onClearState}
      >
        <Dropzone
          error={error}
          isLoading={isLoading}
          onFileChange={onFileChange}
          onFileReset={onFileReset}
          onFileDrop={onFileDrop}
          onFileDragOver={onFileDragOver}
        />
      </MobileViewUpload>

      <MobileViewNavigation
        funnelJson={funnelJson}
        currentFunnelPage={currentFunnelPage}
        onFunnelPageChange={onFunnelPageChange}
      />
    </section>
  );
};

export default Home;
