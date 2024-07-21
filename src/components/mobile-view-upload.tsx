import type { FunnelJSON } from "@/types/types";
import { Upload } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

export type MobileViewUploadProps = {
  children?: React.ReactNode;
  isLoading: boolean;
  funnelJson: FunnelJSON | undefined;
  currentFunnelPage: number;
  onFunnelPageChange: (index: number) => void;
  onClearState: () => void;
};

const MobileViewUpload = ({
  children,
  isLoading,
  funnelJson,
  onClearState,
}: MobileViewUploadProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className="visible sm:hidden absolute p-1 m-1 bottom-[12vh] right-[3%]"
      >
        <Button size="icon" variant="default" className="rounded-full">
          <Upload />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            <div className="pt-1 px-2">{children}</div>
            {!isLoading && funnelJson && (
              <>
                <div className="p-2">
                  <h2 className="text-md my-4 truncate">{funnelJson.name}</h2>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={onClearState}
                  >
                    Remove
                  </Button>
                </div>
              </>
            )}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileViewUpload;
