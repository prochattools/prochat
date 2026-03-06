import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { ACTION_LABEL_CLASS_NAME, formatActionLabelNode } from "@/helpers/action-label"
import { cn } from "@/helpers/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-[var(--pc-button-radius)] text-sm ${ACTION_LABEL_CLASS_NAME} ring-offset-background transition-[background-color,background-image,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default:
          "btn-primary shadow-elevation-1 hover:shadow-elevation-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "btn-secondary shadow-elevation-1 hover:border-border-strong hover:bg-surface",
        secondary:
          "border border-border-subtle bg-surface-elevated text-foreground shadow-elevation-1 hover:bg-surface",
        ghost: "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {formatActionLabelNode(children)}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
