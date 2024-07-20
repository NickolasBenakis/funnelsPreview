import { getValidColor } from "@/lib/utils";
import type React from "react";
import { isMobile } from "react-device-detect";
import { AnimatedComponent } from "./animated-component";

export type MobileArtboardProps = {
  children?: React.ReactNode;
  bgColor?: string;
  name?: string;
  id: string;
};

const MobileArtboard = ({
  children,
  bgColor,
  name,
  id,
}: MobileArtboardProps) => {
  return (
    <AnimatedComponent
      id={`artboard-${id}`}
      data-name={name}
      style={{
        backgroundColor: getValidColor(bgColor) || "inherit",
      }}
      className={`border border-gray-300 relative rounded-md z-90 group/artboard mx-auto my-12 box-content min-h-[620px] shadow-2xl transition-all duration-200 ease-out ${
        isMobile ? "w-full" : "w-[375px]"
      }`}
    >
      {children}
    </AnimatedComponent>
  );
};

export default MobileArtboard;
