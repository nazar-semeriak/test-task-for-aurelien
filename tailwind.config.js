const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        warning: {
          DEFAULT: "hsl(62, 93%, 47%)",
          foreground: "hsl(52, 91%, 35%)",
          50: "hsl(71, 92%, 95%)",
          100: "hsl(71, 97%, 88%)",
          200: "hsl(69, 98%, 77%)",
          300: "hsl(67, 97%, 64%)",
          400: "hsl(65, 95%, 53%)",
          500: "hsl(62, 93%, 47%)",
          600: "hsl(58, 95%, 40%)",
          700: "hsl(52, 91%, 35%)",
          800: "hsl(48, 81%, 29%)",
          900: "hsl(45, 73%, 26%)",
          950: "hsl(43, 83%, 14%)",
        },
        success: {
          DEFAULT: "hsl(93, 100%, 44%)",
          foreground: "hsl(95, 97%, 27%)",
          50: "hsl(84, 100%, 95%)",
          100: "hsl(87, 100%, 89%)",
          200: "hsl(89, 100%, 79%)",
          300: "hsl(90, 100%, 66%)",
          400: "hsl(92, 96%, 55%)",
          500: "hsl(93, 100%, 44%)",
          600: "hsl(95, 100%, 35%)",
          700: "hsl(95, 97%, 27%)",
          800: "hsl(96, 86%, 23%)",
          900: "hsl(97, 76%, 16%)",
          950: "hsl(99, 100%, 10%)",
        },
        error: {
          DEFAULT: "hsl(324, 76%, 60%)",
          foreground: "hsl(221, 64%, 48%)",
          50: "hsl(322, 73%, 97%)",
          100: "hsl(319, 70%, 95%)",
          200: "hsl(319, 81%, 90%)",
          300: "hsl(320, 83%, 82%)",
          400: "hsl(322, 80%, 70%)",
          500: "hsl(324, 76%, 60%)",
          600: "hsl(326, 67%, 51%)",
          700: "hsl(328, 73%, 42%)",
          800: "hsl(329, 70%, 38%)",
          900: "hsl(329, 65%, 30%)",
          950: "hsl(330, 79%, 17%)",
        },
        primary: {
          DEFAULT: "hsl(214, 77%, 60%)",
          foreground: "hsl(221, 64%, 48%)",
          50: "hsl(210, 88%, 97%)",
          100: "hsl(211, 78%, 93%)",
          200: "hsl(209, 82%, 87%)",
          300: "hsl(209, 82%, 78%)",
          400: "hsl(210, 79%, 68%)",
          500: "hsl(214, 77%, 60%)",
          600: "hsl(218, 70%, 53%)",
          700: "hsl(221, 64%, 48%)",
          800: "hsl(222, 60%, 37%)",
          900: "hsl(221, 54%, 33%)",
          950: "hsl(222, 48%, 21%)",
        },
        //DOC: Check if there is a need to use css variable ?
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
