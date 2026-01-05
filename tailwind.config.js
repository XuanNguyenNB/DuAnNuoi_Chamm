/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Pink Pastel theme
                'cham-pink': {
                    50: '#fef1f7',
                    100: '#fee5f0',
                    200: '#ffcce3',
                    300: '#ffa1cb',
                    400: '#ff69a8',
                    500: '#ff3d87',
                    600: '#f0185f',
                    700: '#d10a47',
                    800: '#ad0c3c',
                    900: '#900f35',
                },
                'cham-cream': '#fffbf5',
                'cham-red': '#ff4d6d',
            },
            fontFamily: {
                'cute': ['Nunito', 'Comic Sans MS', 'cursive'],
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                'pulse-heart': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
