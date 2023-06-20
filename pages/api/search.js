const fetchWeatherData = async (ville) => {
  const key = process.env.API_KEY;
  const geocodingResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=1&appid=${key}`);
  if (geocodingResponse.status === 404) {
    throw new Error('Geocoding API returned 404');
  }
  const [geocodingData] = await geocodingResponse.json();
  const latitude = geocodingData.lat;
  const longitude = geocodingData.lon;
  const [currentResponse, forecastResponse, airPollutionResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${key}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`),
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`),
  ]);
  if (currentResponse.status === 404 || forecastResponse.status === 404) {
    throw new Error('Weather API returned 404');
  }
  const [currentData, forecastData, airPollutionData] = await Promise.all([
    currentResponse.json(),
    forecastResponse.json(),
    airPollutionResponse.json(),
  ]);

  return {
    currentData,
    forecastData,
    airPollutionData,
  };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { villeTrim } = req.body;
    try {
      const { currentData, forecastData, airPollutionData } = await fetchWeatherData(villeTrim);
      res.status(200).json({ currentData, forecastData, airPollutionData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).send('');
  }
}
