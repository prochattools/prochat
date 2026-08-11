import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/helpers/utils"

const sectionVariants = cva("pc-surface-section relative", {
  variants: {
    tone: {
      transparent: "",
      muted: "bg-surface-soft/70 border-y border-border-subtle/80",
      surface: "bg-surface border-y border-border-subtle/70",
    },
    spacing: {
      compact: "py-14 md:py-16",
      default: "py-20 md:py-24",
      loose: "py-24 md:py-32",
    },
  },
  defaultVariants: {
    tone: "transparent",
    spacing: "default",
  },
})

const panelVariants = cva("pc-surface-panel rounded-2xl border transition-colors", {
  variants: {
    tone: {
      default: "bg-surface border-border-subtle shadow-surface",
      soft: "bg-surface-soft border-border-subtle shadow-surface",
      elevated: "bg-surface-elevated border-border shadow-elevated",
    },
    padding: {
      none: "p-0",
      compact: "p-4 md:p-5",
      default: "p-6 md:p-8",
    },
    interactive: {
      true: "hover:border-border-strong hover:shadow-elevated",
      false: "",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "default",
    interactive: false,
  },
})

const listRowVariants = cva(
  "w-full rounded-lg border px-3 py-2 text-left transition-all duration-150 ease-out",
  {
    variants: {
      selected: {
        true: "pc-selected-row",
        false: "border-transparent hover:border-border-subtle hover:bg-surface-soft/75",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
)

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, spacing, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ tone, spacing }), className)}
      {...props}
    />
  ),
)
Section.displayName = "Section"

interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, tone, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(panelVariants({ tone, padding, interactive }), className)}
      {...props}
    />
  ),
)
Panel.displayName = "Panel"

export { Panel, Section, listRowVariants }
