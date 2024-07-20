import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type AnimatedComponentProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export function AnimatedComponent({
  children,
  className,
  id,
  style,
  ...restProps
}: AnimatedComponentProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={cn("", className)}
      style={style}
      {...restProps}
    >
      {children}
    </motion.div>
  );
}
