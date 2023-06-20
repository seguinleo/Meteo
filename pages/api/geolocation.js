const fetchWeatherData = async (latitude, longitude) => {
  const key = process.env.API_KEY;
  const [currentResponse, forecastResponse, airResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`),
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`),
  ]);
  const [currentData, forecastData, airPollutionData] = await Promise.all([
    currentResponse.json(),
    forecastResponse.json(),
    airResponse.json(),
  ]);

  return {
    currentData,
    forecastData,
    airPollutionData,
  };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;
    try {
      const {
        currentData,
        forecastData,
        airPollutionData,
      } = await fetchWeatherData(latitude, longitude);
      res.status(200).json({ currentData, forecastData, airPollutionData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).send('');
  }
}
