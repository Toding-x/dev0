/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        foreground: '#1E293B',
        card: '#FFFFFF',
        'card-foreground': '#1E293B',
        primary: '#3B82F6',
        'primary-foreground': '#FFFFFF',
        secondary: '#E0F2FE',
        'secondary-foreground': '#0369A1',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        accent: '#10B981',
        'accent-foreground': '#FFFFFF',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        border: '#E2E8F0',
        input: '#E2E8F0',
        ring: '#3B82F6',
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
