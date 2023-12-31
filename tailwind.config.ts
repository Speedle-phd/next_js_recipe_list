import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'dashboard-image': 'url("/public/images/hero.jpg")',
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
      },
   },
   daisyui: {
      themes: [
         {
            mytheme: {
               primary: '#a0d4b8',
               secondary: '#d8eeed',
               accent: '#51ac4d',
               neutral: '#1c0d15',
               'base-100': '#fdfbfd',
            },
         },
         'dark',
         'cupcake',
      ],
   },
   plugins: [daisyui],
}
export default config
