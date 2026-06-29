import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SidebarUser } from "../Types/AuthUser";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDisplayName(user: SidebarUser) {
  return user.isContact ? user.fullName! : user.email;
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}