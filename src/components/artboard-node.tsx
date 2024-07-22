import { cn } from "@/lib/utils";
import type { Block } from "@/types/types";
import React from "react";
import ImageNode from "./image-node";

export type ArtboardNodeProps = {
  block: Block;
};
const ArtboardNode = ({ block }: ArtboardNodeProps) => {
  switch (block.type) {
    case "text": {
      return (
        <p
          id={block.id}
          data-type={block.type}
          className={cn(
            `p-2 text-base ${block.align && `text-${block.align}`} `,
          )}
          style={{
            color: block.color || "inherit",
          }}
        >
          {block.text}
        </p>
      );
    }
    case "image":
      return <ImageNode id={block.id} src={block.src} alt={block.alt} />;
    case "list": {
      return (
        <ul
          id={block.id}
          data-testid={block.id}
          data-type={block.type}
          className="py-2"
        >
          {block?.items?.map((item) => (
            <li key={item.id} className="flex flex-col items-center p-1">
              <strong className="p-1">{item.title}</strong>
              <p className="p-0.5">{item.description}</p>
              <img src={item.src} alt={item.title} className="p-1 w-12 h-12" />
            </li>
          ))}
        </ul>
      );
    }
    case "button": {
      return (
        <button
          type="button"
          id={block.id}
          data-type={block.type}
          className="p-2 my-4 mx-auto rounded-lg w-1/2 flex justify-center items-center"
          style={{
            backgroundColor: block.bgColor || "inherit",
            color: block.color || "inherit",
          }}
        >
          {block.text}
        </button>
      );
    }
    default:
      return null;
  }
};

export default ArtboardNode;
