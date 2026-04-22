/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ✅ নতুন ফন্ট অ্যাড করা হলো
      fontFamily: {
        sans: ['var(--font-satoshi)', 'sans-serif'],
      },
      // ✅ তোমার আগের কালারগুলো ঠিক রাখা হয়েছে
      colors: {
        primary: "#FF8FAF",
        secondary: "#CCFAD6",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};