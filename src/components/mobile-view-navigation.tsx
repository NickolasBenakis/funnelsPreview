import type { FunnelJSON } from "@/types/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export type MobileViewNavigationProps = {
  funnelJson: FunnelJSON | undefined;

  currentFunnelPage: number;
  onFunnelPageChange: (index: number) => void;
};

const MobileViewNavigation = ({
  funnelJson,

  currentFunnelPage,
  onFunnelPageChange,
}: MobileViewNavigationProps) => {
  return (
    <div
      id="mobile-page-navigation"
      className="sm:hidden absolute bottom-[12vh] left-[3%] p-1 m-1 flex flex-col gap-2"
    >
      <Button
        size="icon"
        variant="default"
        className="rounded-full"
        onClick={() =>
          onFunnelPageChange(
            currentFunnelPage === 1 ? currentFunnelPage : currentFunnelPage - 1,
          )
        }
      >
        <ArrowUp />
      </Button>

      <Button
        size="icon"
        variant="default"
        className="rounded-full"
        onClick={() =>
          onFunnelPageChange(
            currentFunnelPage === funnelJson?.pages?.length
              ? currentFunnelPage
              : currentFunnelPage + 1,
          )
        }
      >
        <ArrowDown />
      </Button>
    </div>
  );
};

export default MobileViewNavigation;
