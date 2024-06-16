import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// command to run app : npx shadcn-ui@latest add 
// in the last write name of element 
// example : npx shadcn-ui@latest add button