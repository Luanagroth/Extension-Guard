import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f3f4f6",
        ink: "#111827",
        accent: "#1f2937",
        accentSoft: "#cbd5e1",
        success: "#166534",
        warning: "#b45309",
        danger: "#b91c1c",
        line: "#e5e7eb",
        muted: "#6b7280",
        panel: "#ffffff",
      },
      boxShadow: {
        panel: "0 16px 40px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        display: ["Merriweather", "Georgia", "serif"],
        body: ["Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
