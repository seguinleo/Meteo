interface GeocodingData {
  name: string
  lat: number
  lon: number
  country: string
}

interface WeatherData {
  temp: number
  humidity: number
  pressure: number
  wind_speed: number
  wind_deg: number
}

interface AirPollutionData {
  aqi: number
}

interface FetchWeatherDataResponse {
  city: string
  oneCallData: WeatherData
  airPollutionData: AirPollutionData
}

interface RequestBody {
  ville: string
}

interface Request {
  method: string
  body: RequestBody
}

interface Response {
  status: (code: number) => Response
  json: (data: unknown) => void
  send: (data: string) => void
}

const fetchWeatherData = async (ville: string): Promise<FetchWeatherDataResponse> => {
  'use server'
  const key = process.env.API_KEY
  const geocodingResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=1&appid=${key}`
  )

  if (!geocodingResponse.ok) {
    throw new Error('Geocoding API request failed')
  }

  const [geocodingData] = (await geocodingResponse.json()) as GeocodingData[]
  const { lat: latitude, lon: longitude } = geocodingData

  const [oneCallResponse, airPollutionResponse] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=fr`
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`
    ),
  ])

  if (!oneCallResponse.ok) {
    throw new Error('OneCall API request failed')
  }

  const oneCallData = (await oneCallResponse.json()) as WeatherData
  const airPollutionData = (await airPollutionResponse.json()) as AirPollutionData

  return {
    city: `${geocodingData.name}, ${geocodingData.country}`,
    oneCallData,
    airPollutionData,
  }
}

export default async function handler(req: Request, res: Response): Promise<void> {
  if (req.method === 'POST') {
    const { ville } = req.body
    try {
      const weatherData = await fetchWeatherData(ville)
      res.status(200).json(weatherData)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(400).json({ error: errorMessage })
    }
  } else {
    res.status(404).send('')
  }
}
