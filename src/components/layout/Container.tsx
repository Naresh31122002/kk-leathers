import { ElementType } from "react";
import { cn } from "@/lib/cn";

// Centered max-width container (doc 02 §5). Single source for gutters.
export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("container-luxury", className)}>{children}</Tag>;
}
