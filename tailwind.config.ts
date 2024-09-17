import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "primary": "#478ae1",
        "success": "#30b730",
        "dark": "#292929",
        "gray": "#e3e3e3",
        "red": "#f44336"
      }
    }
  },

  plugins: []
} as Config;