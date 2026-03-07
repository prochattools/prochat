import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { ACTION_LABEL_CLASS_NAME, formatActionLabelNode } from "@/helpers/action-label"
import { cn } from "@/helpers/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-[var(--pc-button-radius)] text-sm",
    ACTION_LABEL_CLASS_NAME,
    "ring-offset-background",
    "transition-[background-color,background-image,color,border-color,box-shadow,transform] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "btn-primary shadow-elevation-1 hover:shadow-elevation-2",
        primary: "btn-primary shadow-elevation-1 hover:shadow-elevation-2",
        nav: "btn-nav",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "btn-secondary shadow-elevation-1 hover:border-border-strong hover:bg-surface",
        secondary:
          "btn-secondary shadow-elevation-1 hover:border-border-strong hover:bg-surface",
        tertiary: "btn-tertiary",
        ghost: "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--pc-button-height)] px-[var(--pc-button-padding-x)] py-2",
        sm: "h-[var(--pc-button-height-sm)] px-3",
        lg: "h-[var(--pc-button-height-lg)] px-[var(--pc-button-padding-x-lg)]",
        icon: "h-[var(--pc-button-height)] w-[var(--pc-button-height)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
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
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
