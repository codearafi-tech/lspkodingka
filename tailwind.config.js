import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': ['48px', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h1-desktop': ['48px', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '500' }],
        
        'h2': ['26px', { lineHeight: '130%', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h2-desktop': ['36px', { lineHeight: '130%', letterSpacing: '-0.01em', fontWeight: '500' }],
        
        'h3': ['22px', { lineHeight: '140%', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3-desktop': ['28px', { lineHeight: '140%', letterSpacing: '-0.01em', fontWeight: '600' }],
        
        'h4': ['18px', { lineHeight: '150%', letterSpacing: '0em', fontWeight: '600' }],
        'h4-desktop': ['20px', { lineHeight: '150%', letterSpacing: '0em', fontWeight: '600' }],
        
        'body': ['16px', { lineHeight: '160%', letterSpacing: '0em', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '150%', letterSpacing: '0em', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};