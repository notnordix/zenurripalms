import type React from "react"
import { cn } from "@/lib/utils"

interface RoundedWrapperProps {
  children: React.ReactNode
  className?: string
}

export function RoundedWrapper({ children, className }: RoundedWrapperProps) {
  return <div className={cn("rounded-md", className)}>{children}</div>
}
