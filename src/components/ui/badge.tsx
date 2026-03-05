import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/helpers/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-border-subtle bg-surface px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring/45 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/85",
        secondary:
          "border-transparent bg-muted text-foreground hover:bg-muted/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline: "border-border-subtle bg-surface text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
