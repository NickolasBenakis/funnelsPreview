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
  id,
  isVisible,
}: MobileArtboardProps) => {
  if (!isVisible) return null;

  return (
    <AnimatedComponent
      id={`artboard-${id}`}
      data-testid={`artboard-${id}`}
      style={{
        backgroundColor: getValidColor(bgColor) || "inherit",
      }}
      className={
        "border border-gray-300 relative rounded-md z-90 my-4 mx-auto sm:my-12 w-[90%] sm:w-[375px] box-content min-h-[620px] shadow-md transition-all duration-200 ease-out"
      }
    >
      {children}
    </AnimatedComponent>
  );
};

export default MobileArtboard;
