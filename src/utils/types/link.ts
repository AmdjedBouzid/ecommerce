import { LucideIcon } from "lucide-react";
import { userRole } from "../enums/userRoleUnum";

export type Link = {
  name: string;
  icon?: LucideIcon;
  to: string;
  for?: userRole[];
};
