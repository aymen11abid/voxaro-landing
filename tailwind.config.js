/** Tailwind-Konfiguration — ersetzt die frühere Inline-Config der Play-CDN. */
module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#FF6B00',
        // Dunkleres Orange fuer Text auf hellem Grund (Kontrast >= 4.5:1)
        'brand-ink': '#C94A00',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
