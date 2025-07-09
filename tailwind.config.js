/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      // Fuentes
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      // Colores
      colors: {
        text: {
          primary: '#461604',
          secondary: '#FFF8EC',
        },
        bg: {
          primary: '#FFF8EC',
          secondary: '#FFC36D',
        },
        btn: {
          primary: '#FFC36D',
          'primary-hover': '#FF9E32',
          secondary: '#FFF8EC',
          'secondary-hover': '#FFF0D3',
        },
        feedback: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#A1390B',
        },
      },
      // Espaciado
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      // Tipografía
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.75rem',  // 36px
        '5xl': '3rem',     // 48px
      },
      // Pesos de fuente
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      // Altura de línea
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.625',
      },
      // Sombras
      boxShadow: {
        sm: '0 1px 2px 0 rgba(70, 22, 4, 0.1)',
        md: '0 4px 6px -1px rgba(70, 22, 4, 0.15), 0 2px 4px -2px rgba(70, 22, 4, 0.1)',
        lg: '0 10px 15px -3px rgba(70, 22, 4, 0.1), 0 4px 6px -4px rgba(70, 22, 4, 0.1)',
      },
      // Border Radius
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
      // Breakpoints
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
