const fetchWeatherData = async (villeTrim) => {
  const key = process.env.API_KEY;
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeTrim}&units=metric&appid=${key}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${villeTrim}&units=metric&appid=${key}`),
  ]);
  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error("Ville non reconnue, vérifiez l'orthographe et le nom complet de la ville...");
  }
  const [currentData, forecastData] = await Promise.all([
    currentResponse.json(),
    forecastResponse.json(),
  ]);
  return {
    currentData,
    forecastData,
  };
};
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { villeTrim } = req.body;
    try {
      const { currentData, forecastData } = await fetchWeatherData(villeTrim);
      res.status(200).json({ currentData, forecastData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).send('');
  }
}
