/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#037afe",
          50: "#e0f1ff",
          100: "#b3dbff",
          200: "#80c3ff",
          300: "#4daaff",
          400: "#1a91ff",
          500: "#037afe",
          600: "#0260c6",
          700: "#01478f",
          800: "#002e59",
          900: "#001523",
        },
        secondary: {
          DEFAULT: "#f76308",
          50: "#fff0e6",
          100: "#ffd6bf",
          200: "#ffb38c",
          300: "#ff8f59",
          400: "#ff6b26",
          500: "#f76308",
          600: "#cc4f06",
          700: "#993b04",
          800: "#662803",
          900: "#331401",
        },
      },
      borderRadius: { "5xl": "40px" },
      maxWidth: { "10xl": "1512px" },
      screens: { xs: "400px", "3xl": "1680px", "4xl": "2200px" },
      backgroundImage: {
        "bg-img-1": "url('/img-1.png')",
        "bg-img-2": "url('/img-2.png')",
        "feature-bg": "url('/feature-bg.png')",
        pattern: "url('/pattern.png')",
        "pattern-2": "url('/pattern-bg.png')",
      },
    },
  },
  plugins: [],
};
