# Météo

![Vercel](https://vercelbadge.vercel.app/api/pouletenslip/meteo)

Weather PWA developed with Next.js and [OpenWeatherMapAPI](https://openweathermap.org/api).

User can search a city by name or use its actual location.
A local storage is used to save the last city.
The website displays current temperature, wind speed and direction, humidity, pressure, rain, air quality and more.

Charts for forecasts are displayed with [Recharts](https://recharts.org/en-US/).
A map is displayed with [OpenStreetMap](https://www.openstreetmap.org/).
Weather icons from [Apple](https://support.apple.com/fr-fr/guide/iphone/iph4305794fb/15.0/ios/15.0).
The website uses SSR requests with a Node.js server.

Installation:
```
npm i
```

Create ``.env.local`` at root and add your API_KEY.

```
npm run dev
```

![0](https://github.com/PouletEnSlip/Meteo/blob/main/image.png)
