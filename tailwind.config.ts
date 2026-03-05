import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,scss,css}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--pc-page-gutter)",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      spacing: {
        page: "var(--pc-page-gutter)",
      },
      maxWidth: {
        reading: "var(--pc-reading-max)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        brand: [
          "var(--font-brand)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "var(--font-brand)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        brand: {
          500: "rgb(var(--pc-blue-500-rgb) / <alpha-value>)",
          600: "rgb(var(--pc-blue-600-rgb) / <alpha-value>)",
          900: "rgb(var(--pc-blue-900-rgb) / <alpha-value>)",
        },
        ink: {
          950: "rgb(var(--pc-gray-950-rgb) / <alpha-value>)",
          900: "rgb(var(--pc-gray-900-rgb) / <alpha-value>)",
          800: "rgb(var(--pc-gray-800-rgb) / <alpha-value>)",
          700: "rgb(var(--pc-gray-700-rgb) / <alpha-value>)",
          600: "rgb(var(--pc-gray-600-rgb) / <alpha-value>)",
          500: "rgb(var(--pc-gray-500-rgb) / <alpha-value>)",
          400: "rgb(var(--pc-gray-400-rgb) / <alpha-value>)",
          300: "rgb(var(--pc-gray-300-rgb) / <alpha-value>)",
          200: "rgb(var(--pc-gray-200-rgb) / <alpha-value>)",
          100: "rgb(var(--pc-gray-100-rgb) / <alpha-value>)",
          50: "rgb(var(--pc-gray-50-rgb) / <alpha-value>)",
        },
        background: "rgb(var(--pc-bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--pc-surface-rgb) / <alpha-value>)",
        text: "rgb(var(--pc-text-rgb) / <alpha-value>)",
        muted: "rgb(var(--pc-muted-rgb) / <alpha-value>)",
        border: "rgb(var(--pc-border-rgb) / <alpha-value>)",
        primary: "rgb(var(--pc-blue-600-rgb) / <alpha-value>)",
        secondary: "rgb(var(--pc-blue-500-rgb) / <alpha-value>)",
        "primary-foreground": "rgb(var(--pc-primary-foreground-rgb) / <alpha-value>)",
        ring: "rgb(var(--pc-ring-rgb) / <alpha-value>)",
        card: "rgb(var(--pc-surface-rgb) / <alpha-value>)",
        "card-foreground": "rgb(var(--pc-text-rgb) / <alpha-value>)",
        input: "rgb(var(--pc-border-rgb) / <alpha-value>)",
        destructive: "rgb(var(--pc-destructive-rgb) / <alpha-value>)",
        "destructive-foreground": "rgb(var(--pc-destructive-foreground-rgb) / <alpha-value>)",
        black1: "rgb(var(--pc-gray-950-rgb) / <alpha-value>)",
        foreground: "rgb(var(--pc-text-rgb) / <alpha-value>)",
        "muted-foreground": "rgb(var(--pc-muted-foreground-rgb) / <alpha-value>)",
        prochat: {
          500: "#2563EB",
          600: "#1D4ED8",
          900: "#1E3A8A",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1F2937",
          900: "#0F172A",
          950: "#020617",
        },
      },
      backgroundImage: {
        banner: "url('/assets/banner.svg')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
