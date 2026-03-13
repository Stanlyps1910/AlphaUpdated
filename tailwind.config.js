/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                primary: '#1C1C1C',
                background: '#F7F5F2',
                charcoal: '#1C1C1C',
                ivory: '#F7F5F2',
                gold: '#D4AF37',
                warmgray: '#8E8A84',
                mutedbrown: '#63403a',
                beige: '#F5F5DC',
            }
        },
    },
    plugins: [],
}
