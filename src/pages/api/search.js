const fetchWeatherData = async (ville) => {
  const key = process.env.API_KEY;
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${key}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&units=metric&appid=${key}`)
  ]);
  if (!currentResponse.ok || !forecastResponse.ok) {
    const error = "Ville non reconnue, vérifiez l'orthographe et le nom complet de la ville...";
    throw new Error(error);
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
    const { ville } = req.body;
    try {
      const { currentData, forecastData } = await fetchWeatherData(ville);
      res.status(200).json({ currentData, forecastData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).send('');
  }
}
