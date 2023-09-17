const fetchWeatherData = async (latitude: string, longitude: string): Promise<any> => {
  'use server'

  const key = process.env.API_KEY
  const geocodingResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`)
  if (geocodingResponse.status === 404) {
    throw new Error('Geocoding API returned 404')
  }
  const [geocodingData] = await geocodingResponse.json()
  const [oneCallResponse, airPollutionResponse] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=fr`),
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`)
  ])
  if (oneCallResponse.status !== 200) {
    throw new Error('Unexpected error')
  }
  const [oneCallData, airPollutionData] = await Promise.all([
    oneCallResponse.json(),
    airPollutionResponse.json()
  ])

  return {
    city: `${geocodingData.name}, ${geocodingData.country}`,
    oneCallData,
    airPollutionData
  }
}

export default async function handler (req: any, res: any): Promise<void> {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body
    try {
      const { city, oneCallData, airPollutionData } = await fetchWeatherData(latitude, longitude)
      res.status(200).json({ city, oneCallData, airPollutionData })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.status(404).send('')
  }
}
