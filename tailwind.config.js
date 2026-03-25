/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // pathway colours (kept for Discovery/Resources pages)
        tech:     '#6C5CE7',
        business: '#00B894',
        creative: '#E17055',
        health:   '#0984E3',
        social:   '#FDCB6E',
        // landing design system
        coral:      '#C95C3A',
        cream:      '#F2EDE6',
        'dark-brown': '#211008',
        'dark-teal':  '#1B2E1F',
      },
      fontFamily: {
        archivo:  ['"Archivo Narrow"', 'sans-serif'],
        serif:    ['"Instrument Serif"', 'serif'],
        sans:     ['"Instrument Sans"', 'sans-serif'],
        // kept for other pages
        display:  ['"Bricolage Grotesque"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
