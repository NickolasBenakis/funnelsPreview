import { getValidColor } from "@/lib/utils";
import type React from "react";
import { AnimatedComponent } from "./animated-component";

export type MobileArtboardProps = {
  children?: React.ReactNode;
  bgColor?: string;
  name?: string;
  id: string;
  isVisible?: boolean;
};

const MobileArtboard = ({
  children,
  bgColor,
  name,
  id,
  isVisible,
}: MobileArtboardProps) => {
  if (!isVisible) return null;

  return (
    <AnimatedComponent
      id={`artboard-${id}`}
      data-name={name}
      style={{
        backgroundColor: getValidColor(bgColor) || "inherit",
      }}
      className={
        "border border-gray-300 relative rounded-md z-90 group/artboard my-4 mx-auto sm:my-12 w-[90%] sm:w-[375px] box-content min-h-[620px] shadow-2xl transition-all duration-200 ease-out"
      }
    >
      {children}
    </AnimatedComponent>
  );
};

export default MobileArtboard;
