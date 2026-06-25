import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  narrow?: boolean;
}

export function Container({
  children,
  className,
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        narrow ? "max-w-[720px]" : "max-w-6xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}
