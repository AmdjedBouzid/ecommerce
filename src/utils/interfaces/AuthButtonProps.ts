import { LucideIcon } from "lucide-react";

export interface AuthButtonTypeProps {
  name: string;
  icon?: LucideIcon;
  handle: () => void;
  className?: string;
}
