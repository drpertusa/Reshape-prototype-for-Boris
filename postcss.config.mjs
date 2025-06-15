/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      config: {
        content: [
          './app/**/*.{ts,tsx,mdx}',
          './components/**/*.{ts,tsx}', 
          './lib/**/*.{ts,tsx}',
          './hooks/**/*.{ts,tsx}',
        ]
      }
    },
  },
};

export default config;
