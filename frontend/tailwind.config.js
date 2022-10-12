/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,jsx,ts,tsx}',
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-black': '#111418',
                'brand-blue': '#3592fd',
                'brand-white': '#fff',
                'brand-black-medium': '#212930',
                'brand-black-light': '#111418',
                'brand-blue-light': '#9fb4c7',
            },
        },
    },
    plugins: [],
}
