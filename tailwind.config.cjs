/** @type {import('tailwindcss').Config}
 *  */
module.exports = {
     darkMode: 'dark',
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",],
     theme: {
      extend: { 
         screens: {
             'ls': '200px',
             'sm': '320px',
             'btwn_sm-md' :'500px',
             'md': '700px',
             'lg': '1024px',           
             'xl': '1280px',
             '2xl': '1536px',
             
          
         }          
        }
    },
    plugins: [],
}

