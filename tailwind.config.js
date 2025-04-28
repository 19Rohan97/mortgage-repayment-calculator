/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "lime-900": "#D8DB2F",
        "lime-500": "#D8DB2F",
        "slate-900": "#133041",
        "slate-700": "#4E6E7E",
        "slate-500": "#6B94A8",
        "slate-300": "#9ABED5",
        "slate-100": "#E4F4FD",
        "red-900": "#D73328",
      },
      fontSize: {
        "56px": "56px",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".btn": {
          backgroundColor: theme("colors.lime-900"),
          borderRadius: theme("borderRadius.full"),
          paddingBlock: theme("spacing.4"),
          paddingInline: theme("spacing.10"),
          display: "flex",
          gap: theme("spacing.3"),
        },
        ".preset-1": {
          fontSize: theme("fontSize.56px"),
          lineHeight: "125%",
          letterSpacing: "-1px",
          fontWeight: "bold",
        },
        ".preset-2": {
          fontSize: theme("fontSize.2xl"),
          lineHeight: "125%",
          letterSpacing: "-1px",
          fontWeight: "bold",
        },
        ".preset-3": {
          fontSize: theme("fontSize.lg"),
          lineHeight: "125%",
          letterSpacing: "-1px",
          fontWeight: "bold",
        },
        ".preset-4": {
          fontSize: theme("fontSize.md"),
          lineHeight: "150%",
          letterSpacing: "0px",
          fontWeight: "500",
        },
        ".preset-5": {
          fontSize: theme("fontSize.sm"),
          lineHeight: "150%",
          letterSpacing: "0px",
          fontWeight: "500",
        },
      });
    }),
  ],
};
