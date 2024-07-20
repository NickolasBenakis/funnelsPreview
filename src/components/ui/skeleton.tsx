import { cn } from "@/lib/utils";
import {
  AnimatedComponent,
  type AnimatedComponentProps,
} from "../animated-component";
import { Button, type ButtonProps } from "./button";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-primary/10 text-primary/10",
        className,
      )}
      {...props}
    />
  );
}

function SkeletonButton({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "animate-pulse rounded-md bg-primary/10 text-primary/10 w-full justify-start",
        className,
      )}
      {...props}
    />
  );
}

function SkeletonArtboard({ className, ...props }: AnimatedComponentProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-primary/10 text-primary/10 justify-start border border-gray-300 relative rounded-md z-90 group/artboard mx-auto my-12 box-content min-h-[620px] shadow-2xl transition-all duration-800 ease-out is-mobile w-mobile max-w-mobile w-[375px] h-[80vh]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton, SkeletonButton, SkeletonArtboard };
