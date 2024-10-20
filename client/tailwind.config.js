const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("../default.js")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        pink: {
          css: {
            "--tw-prose-body": theme("colors.gold"),
            "--tw-prose-headings": theme("colors.gold"),
            "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.crimson"),
            "--tw-prose-bold": theme("colors.gold"),
            "--tw-prose-counters": theme("colors.pink[600]"),
            "--tw-prose-bullets": theme("colors.pink[400]"),
            "--tw-prose-hr": theme("colors.pink[300]"),
            "--tw-prose-quotes": theme("colors.pink[900]"),
            "--tw-prose-quote-borders": theme("colors.pink[300]"),
            "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.pink[900]"),
            "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-pre-bg": theme("colors.pink[900]"),
            "--tw-prose-th-borders": theme("colors.pink[300]"),
            "--tw-prose-td-borders": theme("colors.pink[200]"),
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
      backgroundImage: {
        map: "url(/map.svg)",
        // "hex-bg": "url(/hex-bg.png)",
        "old-map": "url(/textures/paper/worldmap-bg.png)",
      },
      fontSize: {
        xxs: ".625rem",
      },
      cursor: {
        fancy: "url(/cursor.png), pointer",
        pointer: "url(/cursor.png), pointer",
        grab: "url(/grab.png), grab",
        crosshair: "url(/cursor-cross.png), crosshair",
        wait: "url(/images/eternum-logo_animated.png), wait",
      },
      strokeWidth: {
        8: "8px",
      },
      animation: {
        slowPulse: "slowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        slowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  safelist: [
    "bg-order-power",
    "bg-order-giants",
    "bg-order-titans",
    "bg-order-brilliance",
    "bg-order-skill",
    "bg-order-perfection",
    "bg-order-twins",
    "bg-order-reflection",
    "bg-order-detection",
    "bg-order-fox",
    "bg-order-vitriol",
    "bg-order-enlightenment",
    "bg-order-protection",
    "bg-order-fury",
    "bg-order-rage",
    "bg-order-anger",
    "bg-order-gods",
    "fill-order-power",
    "fill-order-giants",
    "fill-order-titans",
    "fill-order-brilliance",
    "fill-order-skill",
    "fill-order-perfection",
    "fill-order-twins",
    "fill-order-reflection",
    "fill-order-detection",
    "fill-order-fox",
    "fill-order-vitriol",
    "fill-order-enlightenment",
    "fill-order-protection",
    "fill-order-fury",
    "fill-order-rage",
    "fill-order-anger",
    "fill-order-gods",
    "stroke-order-power",
    "stroke-order-giants",
    "stroke-order-titans",
    "stroke-order-brilliance",
    "stroke-order-skill",
    "stroke-order-perfection",
    "stroke-order-twins",
    "stroke-order-reflection",
    "stroke-order-detection",
    "stroke-order-fox",
    "stroke-order-vitriol",
    "stroke-order-enlightenment",
    "stroke-order-protection",
    "stroke-order-fury",
    "stroke-order-rage",
    "stroke-order-anger",
    "stroke-order-gods",
    "text-order-power",
    "text-order-giants",
    "text-order-titans",
    "text-order-brilliance",
    "text-order-skill",
    "text-order-perfection",
    "text-order-twins",
    "text-order-reflection",
    "text-order-detection",
    "text-order-fox",
    "text-order-vitriol",
    "text-order-enlightenment",
    "text-order-protection",
    "text-order-fury",
    "text-order-rage",
    "text-order-anger",
    "text-order-gods",
    "text-biome-deep_ocean",
    "text-biome-ocean",
    "text-biome-beach",
    "text-biome-scorched",
    "text-biome-bare",
    "text-biome-tundra",
    "text-biome-snow",
    "text-biome-temperate_desert",
    "text-biome-shrubland",
    "text-biome-taiga",
    "text-biome-grassland",
    "text-biome-temperate_deciduous_forest",
    "text-biome-temperate_rain_forest",
    "text-biome-subtropical_desert",
    "text-biome-tropical_seasonal_forest",
    "text-biome-tropical_rain_forest",
    "text-ally",
    "text-enemy",
    "bg-ally",
    "bg-enemy",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".border-gradient": {
          borderImage: "linear-gradient(to right, transparent, #F3C99F, transparent) 1",
        },
        ".clip-squared": {
          clipPath: "polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)",
        },
        ".clip-squared-top": {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 10%)",
        },
        ".outline-gradient": {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          borderImage: "linear-gradient(to right, transparent, #F3C99F, transparent) 1",
        },
        ".no-scrollbar": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
