import { ImageOff } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export type ImageNodeProps = {
  id: string;
  src?: string;
  alt?: string;
};
const ImageNode = ({ id, src, alt }: ImageNodeProps) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className="flex flex-col gap-4 bg-primary/10 text-primary mx-2 px-2 h-48 items-center justify-center pt-5 pb-6">
        <ImageOff />
        <p className="text-center">Failed to fetch image</p>
      </div>
    );
  }
  return (
    <img
      id={id}
      src={src}
      alt={alt || "image node"}
      className="px-2 w-full"
      onError={() => setError(true)}
    />
  );
};

export default ImageNode;
