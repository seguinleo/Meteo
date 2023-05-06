const fetchWeatherData = async (latitude, longitude) => {
  const key = process.env.API_KEY;
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`)
  ]);
  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error("Erreur lors de la récupération des données météo. Veuillez réessayer plus tard...");
  }
  const [currentData, forecastData] = await Promise.all([
    currentResponse.json(),
    forecastResponse.json()
  ]);
  return {
    currentData,
    forecastData
  };
};
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;
    try {
      const { currentData, forecastData } = await fetchWeatherData(latitude, longitude);
      res.status(200).json({ currentData, forecastData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).send('');
  }
}
