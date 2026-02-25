# Météo

![Vercel](https://vercelbadge.vercel.app/api/seguinleo/meteo)

Weather PWA developed with Next.js and [OpenWeatherMapAPI](https://openweathermap.org/api).

User can search a city by name or use its actual location.
A local storage is used to save the last city.
The website displays current temperature, wind speed and direction, humidity, pressure, rain, air quality and more.

Charts for forecasts are displayed with [Recharts](https://recharts.org/en-US/).
[Weather icons](https://icons8.com/icons/set/weather--style-keek).
The website uses SSR requests with a Node.js server.

## For developers

``npm i`` to install all dependencies

Create ``.env.local`` at root and add your API_KEY

``npm run dev`` to start the server

``npm run sass`` to compile Saas files
