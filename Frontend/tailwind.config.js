import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary))',
        secondary: '#db2777',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#EC4899',
          secondary: '#F3F4F6',
          accent: '#22D3EE',
          neutral: '#212121', // Background color
          'base-100': 'hsl(0, 0%, 5%)', // Background
          // 'base-100': 'hsl(300, 3%, 6%)', // Background, v2
          'base-200': '#2A2A2A', // Slightly lighter background for cards
          'base-content': 'hsl(0, 0%, 95%)', // Text color
        },
      },
      'light', // Keep default light theme
    ],
  },
};
