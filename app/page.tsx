'use client'

import React, { useState, useEffect, useCallback, JSX } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs'
import {
  WiMoonAltWaningGibbous3,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent3,
  WiMoonAltNew,
  WiMoonAltWaxingCrescent3,
  WiMoonAltFirstQuarter,
  WiMoonAltWaxingGibbous3,
  WiMoonAltFull
} from 'react-icons/wi'
import Image from 'next/image'
import Link from 'next/link'
import CustomTooltip from './components/CustomTooltip'
import RainGauge from './components/RainGauge'
import './assets/css/style.min.css'

interface Weather {
  description: string
  id: number
}

interface MinutelyData {
  dt: number
  precipitation: number
}

interface WeatherItem {
  dt: number
  weather: Weather[]
  temp: number
  humidity: number
  pressure: number
  wind_speed: number
  wind_deg: number
  rain?: { '1h': number }
  pop?: number
  uvi: number
}

interface WeatherForecast {
  temp: {
    day: number
    min: number
    max: number
  }
  weather: Weather[]
  pop: number
  dt: number
  moon_phase: number
}

interface WeatherAlert {
  event: string,
  description: string,
  tags: string[]
}

interface WeatherData {
  minutely: MinutelyData[]
  hourly: WeatherItem[]
  daily: WeatherForecast[]
  timezone: string
  timezone_offset: number
  lat: string
  lon: string
  current: {
    weather: Weather[]
    wind_deg: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    wind_speed: number
    uvi: number
    dew_point: number
    clouds: number
  }
  alerts: WeatherAlert[]
}

interface WeatherDataAir {
  list: Array<{
    main: {
      aqi: number
    }
  }>
}

interface ChartDataItem {
  temp: number
  wind: number
  [key: string]: any
}

const weatherConfig = [
  { range: [200, 210], icon: 'thunder', iconNight: 'thunder', day: '#19242b', night: '#281e33' },
  { range: [211, 232], icon: 'storm', iconNight: 'storm', day: '#202d36', night: '#2f1f3f' },
  { range: [300, 321], icon: 'drizzle', iconNight: 'drizzle', day: '#425b6b', night: '#543973' },
  { range: [500, 501], icon: 'rain', iconNight: 'rain', day: '#3d5669', night: '#412e57' },
  { range: [502, 504], icon: 'shower', iconNight: 'shower', day: '#2c3c47', night: '#312440' },
  { range: [511, 520], icon: 'rain', iconNight: 'rain', day: '#879eb0', night: '#5a4c6b' },
  { range: [521, 531], icon: 'shower', iconNight: 'shower', day: '#2c3c47', night: '#312440' },
  { range: [600, 601], icon: 'snow', iconNight: 'snow', day: '#9cb0c0', night: '#77668a' },
  { range: [602, 622], icon: 'blizzard', iconNight: 'blizzard', day: '#657682', night: '#857a91' },
  { range: [701, 771], icon: 'fog', iconNight: 'fogNight', day: '#38aafc', night: '#895abf' },
  { range: [781], icon: 'tornado', iconNight: 'tornado', day: '#2c3c47', night: '#462c63' },
  { range: [800], icon: 'sun', iconNight: 'moon', day: '#1c95ec', night: '#723ead' },
  { range: [801], icon: 'fewclouds', iconNight: 'fewcloudsNight', day: '#5080a3', night: '#5a308a' },
  { range: [802], icon: 'clouds', iconNight: 'clouds', day: '#496c85', night: '#4a2d6b' },
  { range: [803, 804], icon: 'manyclouds', iconNight: 'manyclouds', day: '#496c85', night: '#4a2d6b' }
]

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [showErrorBox, setShowErrorBox] = useState(false)
  const timeoutError = React.useRef<number | null>(null)
  const [showComponents, setShowComponents] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [metaTheme, setMetaTheme] = useState('#1c95ec')
  const [city, setCity] = useState('')
  const [weatherState, setWeatherState] = useState({
    weatherId: 0,
    temperature: '',
    description: '',
    feelsLike: '',
    humidity: '',
    wind: '',
    windAngle: 0,
    pressure: '',
    sunrise: '',
    sunset: '',
    uv: 0,
    dewPoint: '',
    clouds: 0,
    latitudeCity: '',
    longitudeCity: '',
    moonPhase: null as JSX.Element | null,
    airPollution: '',
    alerts: null as WeatherAlert[] | null,
    thunderMessage: '',
    heatMessage: '',
    floodMessage: '',
    iceMessage: '',
  })
  const [chartState, setChartState] = useState({
    dataChart1: Array(24).fill(null) as ChartDataItem[],
    dataChart2: Array(24).fill(null) as ChartDataItem[],
  })
  const [forecastState, setForecastState] = useState({
    days: Array(8).fill(null) as string[],
    tempMinDays: Array(8).fill(null) as string[],
    tempMeanDays: Array(8).fill(null) as string[],
    tempMaxDays: Array(8).fill(null) as string[],
    imgDays: Array(8).fill(null) as string[],
  })
  const [minutelyData, setMinutelyData] = useState<MinutelyData[]>([])
  const [hour, setHour] = useState('')
  const [error, setError] = useState('')

  const getImage = useCallback((
    id: number,
    sunDown: string,
    sunUp: string,
    time: string
  ) => {
    const toMinutes = (t: string) => {
      if (!t.includes(':')) return 0
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    }
    const isDay =
      toMinutes(time) >= toMinutes(sunUp) &&
      toMinutes(time) < toMinutes(sunDown)
    const config = weatherConfig.find(({ range }) => {
      if (range.length === 1) return id === range[0]
      return id >= range[0] && id <= range[1]
    })
    if (!config) {
      const fallback = { imgSrc: '/assets/icons/clouds.png', backgroundColor: isDay ? '#496c85' : '#4a2d6b' }
      return fallback
    }
    const backgroundColor = isDay ? config.day : config.night
    return {
      imgSrc: `/assets/icons/${isDay ? config.icon : config.iconNight}.png`,
      backgroundColor,
    }
  }, [])

  const getMoonPhaseIcon = useCallback((phase: number): JSX.Element | null => {
    if (phase > 0 && phase < 0.25) return <WiMoonAltWaningGibbous3 />
    if (phase === 0.25) return <WiMoonAltThirdQuarter />
    if (phase > 0.25 && phase < 0.5) return <WiMoonAltWaningCrescent3 />
    if (phase === 0.5) return <WiMoonAltNew />
    if (phase > 0.5 && phase < 0.75) return <WiMoonAltWaxingCrescent3 />
    if (phase === 0.75) return <WiMoonAltFirstQuarter />
    if (phase > 0.75 && phase < 1) return <WiMoonAltWaxingGibbous3 />
    return <WiMoonAltFull />
  }, [])

  const getAirQualityText = useCallback((aqi: number): string => {
    if (aqi === 1) return `${aqi} (Excellente)`
    if (aqi === 2) return `${aqi} (Bonne)`
    if (aqi === 3) return `${aqi} (Moyenne)`
    if (aqi === 4) return `${aqi} (Mauvaise)`
    return `${aqi} (Très mauvaise)`
  }, [])

  const showError = useCallback((message: string) => {
    if (timeoutError.current) {
      clearTimeout(timeoutError.current)
      timeoutError.current = null
    }

    setError(message)
    setShowErrorBox(true)

    timeoutError.current = window.setTimeout(() => {
      setShowErrorBox(false)
      timeoutError.current = null
    }, 5000)
  }, [])

  const fetchDataForecasts = useCallback(async (data: WeatherData, sunDown: string, sunUp: string) => {
    const { minutely, hourly, daily } = data
    const currentDateTime = new Date()
    const currentDay = currentDateTime.toLocaleDateString('fr-FR', { timeZone: data.timezone })
    const nextDay = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000)
    const nextDayFormatted = nextDay.toLocaleDateString('fr-FR', { timeZone: data.timezone })

    const createChartData = (
      items: WeatherItem[],
      filterFn: (item: WeatherItem, index: number) => boolean
    ) => {
      return items
        .filter(filterFn)
        .map((item) => {
          const forecastDateTime = new Date(item.dt * 1000)
          const forecastTime = forecastDateTime.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: data.timezone,
          })
          return {
            name: forecastTime,
            description: item.weather[0].description,
            temp: +item.temp.toFixed(1),
            humidity: item.humidity,
            pressure: item.pressure,
            wind: +(item.wind_speed * 3.6).toFixed(0),
            windDeg: item.wind_deg,
            weather: item.weather[0].id,
            precipitation: item.rain ? +item.rain['1h'].toFixed(2) : 0,
            rain: item.pop ? +(item.pop * 100).toFixed(0) : 0,
            uv: +item.uvi.toFixed(0),
            sunDownH: sunDown,
            sunUpH: sunUp,
          }
        })
    }

    let chartData1 = createChartData(hourly, (item) => {
      const forecastDateTime = new Date(item.dt * 1000)
      const forecastDay = forecastDateTime.toLocaleDateString('fr-FR', { timeZone: data.timezone })
      return forecastDay === currentDay
    }).slice(1)

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 900

    if (isMobile && chartData1.length > 12) {
      chartData1 = chartData1.filter((_, index) => index % 2 === 0)
    }

    const chartDataAir = createChartData(hourly, (item, index) => {
      const forecastDateTime = new Date(item.dt * 1000)
      const forecastDay = forecastDateTime.toLocaleDateString('fr-FR', { timeZone: data.timezone })
      if (isMobile) {
        return forecastDay === nextDayFormatted && index % 2 === 0
      }
      return forecastDay === nextDayFormatted
    })

    const forecastsDaily = daily.slice(2)
    const temperaturesDailyMax = forecastsDaily.map((forecast) => Math.floor(forecast.temp.max))
    const temperaturesDailyMin = forecastsDaily.map((forecast) => Math.floor(forecast.temp.min))
    const temperaturesDailyMean = forecastsDaily.map((forecast) => Math.floor(forecast.temp.day))
    const weatherIdsDaily = forecastsDaily.map((forecast) => forecast.weather[0].id)
    const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']
    const dates = forecastsDaily.map((forecast) => new Date(forecast.dt * 1000))
    const daysOfWeek = dates.map((date) => days[date.getDay()])

    setForecastState((prev) => ({
      ...prev,
      days: daysOfWeek,
      tempMinDays: temperaturesDailyMin.map((t) => `${t}°C`),
      tempMeanDays: temperaturesDailyMean.map((t) => `${t}°C`),
      tempMaxDays: temperaturesDailyMax.map((t) => `${t}°C`),
      imgDays: weatherIdsDaily.map((id) => getImage(id, '1', '0', '0').imgSrc),
    }))

    setChartState({ dataChart1: chartData1, dataChart2: chartDataAir })
    if (minutely) setMinutelyData(minutely)
  }, [getImage])

  const fetchDataCurrent = useCallback(async (city: string, data: WeatherData, dataAir: WeatherDataAir) => {
    const { current, alerts, timezone_offset: timezoneOffset } = data
    const weatherId = current.weather[0].id
    const ventDeg = current.wind_deg || 0
    const date = new Date()
    const timezoneOffsetMinutes = timezoneOffset / 60
    const timezoneOffsetHours = timezoneOffset / 3600
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
    const localDate = new Date(utcDate.getTime() + (timezoneOffsetHours * 60 * 60 * 1000))
    const hourLocale = localDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const sunriseUTC = new Date(current.sunrise * 1000 || 0)
    const sunsetUTC = new Date(current.sunset * 1000 || 0)
    const offsetMilliseconds = (date.getTimezoneOffset() + timezoneOffsetMinutes) * 60 * 1000
    const sunriseLocal = new Date(sunriseUTC.getTime() + offsetMilliseconds)
    const sunsetLocal = new Date(sunsetUTC.getTime() + offsetMilliseconds)
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
    const sunUp = sunriseLocal.toLocaleTimeString('fr-FR', timeOptions)
    const sunDown = sunsetLocal.toLocaleTimeString('fr-FR', timeOptions)
    const result = getImage(weatherId, sunDown, sunUp, hourLocale)
    const { backgroundColor } = result
    setMetaTheme(backgroundColor)

    const hasTag = (alert: WeatherAlert, tag: string): boolean => {
      return alert.tags?.some((t) => t.toLowerCase().includes(tag)) ?? false
    }

    setWeatherState((prev) => ({
      ...prev,
      weatherId: current.weather[0].id,
      temperature: `${+current.temp.toFixed(1)}°C`,
      description: current.weather[0].description,
      feelsLike: `${+current.feels_like.toFixed(0)}°C`,
      humidity: `${current.humidity}%`,
      wind: `${+(3.6 * current.wind_speed).toFixed(0)}km/h`,
      windAngle: (ventDeg + 180) % 360,
      pressure: `${current.pressure}hPa`,
      sunrise: sunUp,
      sunset: sunDown,
      uv: +current.uvi.toFixed(0),
      dewPoint: `${+(current.dew_point).toFixed(1)}°C`,
      clouds: +current.clouds.toFixed(0),
      latitudeCity: data.lat,
      longitudeCity: data.lon,
      moonPhase: getMoonPhaseIcon(data.daily[0].moon_phase),
      airPollution: dataAir?.list?.[0]?.main?.aqi
        ? getAirQualityText(dataAir.list[0].main.aqi)
        : 'N/A',
      alerts: alerts,
      thunderMessage: alerts?.some((alert) => hasTag(alert, 'thunder')) ? 'VIGILANCE ORAGES' : '',
      heatMessage: alerts?.some((alert) => hasTag(alert, 'high_temperature')) ? 'VIGILANCE FORTES CHALEURS' : '',
      floodMessage: alerts?.some((alert) => hasTag(alert, 'flood')) ? 'VIGILANCE INONDATIONS' : '',
      iceMessage: alerts?.some((alert) => hasTag(alert, 'ice')) ? 'VIGILANCE VERGLAS' : '',
    }))

    setHour(hourLocale)
    document.body.style.background = backgroundColor
    localStorage.setItem('city', city)

    await fetchDataForecasts(data, sunDown, sunUp)
  }, [getImage, getMoonPhaseIcon, getAirQualityText, fetchDataForecasts])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      })

      const data = await response.json()

      if (response.ok) {
        const { city, oneCallData, airPollutionData } = data
        await fetchDataCurrent(city, oneCallData, airPollutionData)
        setCity(city)
        setShowComponents(true)
      } else {
        showError('Un problème est survenu, saisissez le nom complet de la ville...')
      }
    } catch (error) {
      showError('Erreur réseau...')
    } finally {
      setLoading(false)
    }
  }, [city, fetchDataCurrent, showError])

  const geolocation = useCallback(async () => {
    if (!navigator.geolocation) {
      showError('Votre navigateur ne supporte pas la géolocalisation...')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch('/api/geolocation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          })

          const data = await response.json()

          if (response.ok) {
            const { city, oneCallData, airPollutionData } = data
            await fetchDataCurrent(city, oneCallData, airPollutionData)
            setCity(city)
            setShowComponents(true)
          } else {
            showError('Un problème est survenu lors de la géolocalisation...')
          }
        } catch (err) {
          showError('Erreur réseau...')
        } finally {
          setLoading(false)
        }
      },
      () => {
        showError('Veuillez activer la géolocalisation...')
        setLoading(false)
      }
    )
  }, [fetchDataCurrent, showError])

  const handleUnity = useCallback(() => {
    const isCelsius = weatherState.temperature.endsWith('°C')

    const extractNumber = (value: string): number =>
      parseFloat(value.replace(/[^\d.-]/g, ''))

    const convertTemp = (value: string): string => {
      if (!value) return ''
      const num = extractNumber(value)
      const converted = isCelsius
        ? (num * 1.8 + 32)
        : ((num - 32) / 1.8)
      return `${converted.toFixed(1)}°${isCelsius ? 'F' : 'C'}`
    }

    const convertWind = (value: string): string => {
      if (!value) return ''
      const num = extractNumber(value)
      const converted = isCelsius
        ? (num / 1.609)
        : (num * 1.609)
      return `${converted.toFixed(0)}${isCelsius ? 'mph' : 'km/h'}`
    }

    setWeatherState(prev => ({
      ...prev,
      temperature: convertTemp(prev.temperature),
      feelsLike: convertTemp(prev.feelsLike),
      dewPoint: convertTemp(prev.dewPoint),
      wind: convertWind(prev.wind),
    }))

    setForecastState(prev => ({
      ...prev,
      tempMinDays: prev.tempMinDays.map(convertTemp),
      tempMeanDays: prev.tempMeanDays.map(convertTemp),
      tempMaxDays: prev.tempMaxDays.map(convertTemp),
    }))

    const convertChartData = (data: ChartDataItem[]) =>
      data.map(item => ({
        ...item,
        temp: isCelsius
          ? +(item.temp * 1.8 + 32).toFixed(1)
          : +((item.temp - 32) / 1.8).toFixed(1),
        wind: isCelsius
          ? +(item.wind / 1.609).toFixed(0)
          : +(item.wind * 1.609).toFixed(0),
      }))

    setChartState(prev => ({
      dataChart1: convertChartData(prev.dataChart1),
      dataChart2: convertChartData(prev.dataChart2),
    }))

  }, [weatherState.temperature])

  useEffect(() => {
    const savedCity = localStorage.getItem('city')
    if (savedCity) setCity(savedCity)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    return () => {
      if (timeoutError.current) clearTimeout(timeoutError.current)
    }
  }, [])

  useEffect(() => {
    const metaThemeColor = document.querySelectorAll('.themecolor')
    metaThemeColor.forEach(meta =>
      meta.setAttribute('content', metaTheme)
    )
  }, [metaTheme])

  return (
    <>
      <dialog
        open={showAlertModal}
        className="alert-dialog"
      >
        <button
          className="close-dialog"
          onClick={() => setShowAlertModal(false)}
          aria-label="Fermer"
        >
          ✕
        </button>
        <h2>Alertes météo</h2>
        {weatherState.alerts && weatherState.alerts.length > 0 ? (
          weatherState.alerts.map((alert, index) => (
            <div key={index} className="alert-item">
              <h3>{alert.event}</h3>
              <p>{alert.description}</p>
              {alert.tags && (
                <div className="alert-tags">
                  {alert.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucune alerte en cours.</p>
        )}
      </dialog>
      <div className="wrapper">
        <header className={showComponents ? 'flex' : ''}>
          {showComponents ? (
            <>
              <div>
                <p>
                  <span id="hour">
                    {hour}
                  </span>
                  {city}
                </p>
              </div>
              <div>
                {weatherState.alerts && weatherState.alerts.length > 0 && (
                  <button
                    type="button"
                    aria-label="Alertes météo"
                    className="alert-button"
                    onClick={() => setShowAlertModal(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#ffffff" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z" /></svg>
                  </button>
                )}
                <button type="button" aria-label="Recherche" onClick={() => setShowComponents(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="#ffffff" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                  </svg>
                </button>
                <button type="button" aria-label="Changer d'unité" onClick={handleUnity}>
                  {weatherState.temperature.endsWith('C') ? '°F' : '°C'}
                </button>
              </div>
            </>
          ) : (
            <h1>Météo</h1>
          )}
          {showErrorBox && (
            <div id="error-notification">
              {error}
            </div>
          )}
        </header>
        <main>
          {!showComponents && (
            <form onSubmit={handleSubmit}>
              <div className="input-part">
                {loading && <p className="info-txt">Chargement...</p>}
                <input
                  type="text"
                  placeholder="Paris, FR"
                  maxLength={50}
                  aria-label="Rechercher une ville"
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  aria-required="true"
                  required
                />
                <button type="submit">Rechercher</button>
                <div className="separator" />
                <button type="button" onClick={geolocation}>Localisation actuelle</button>
              </div>
            </form>
          )}
          {showComponents && (
            <>
              <section>
                {weatherState.thunderMessage && <div className="alerts-thunder-part"><span>{weatherState.thunderMessage}</span></div>}
                {weatherState.heatMessage && <div className="alerts-heat-part"><span>{weatherState.heatMessage}</span></div>}
                {weatherState.floodMessage && <div className="alerts-flood-part"><span>{weatherState.floodMessage}</span></div>}
                {weatherState.iceMessage && <div className="alerts-ice-part"><span>{weatherState.iceMessage}</span></div>}
              </section>
              <section>
                <div className="main-info">
                  <div className="temp">
                    <Image
                      src={getImage(
                        weatherState.weatherId,
                        weatherState.sunset,
                        weatherState.sunrise,
                        hour
                      ).imgSrc}
                      className="mainImg"
                      alt={weatherState.description}
                      width={96}
                      height={90}
                    />
                  </div>
                  <div className="temp">
                    <span className="main-temp">{weatherState.temperature}</span>
                    <span className="line">{weatherState.description}</span>
                    <span className="line">ressenti {weatherState.feelsLike}</span>
                    <span className="line">UV {weatherState.uv}</span>
                  </div>
                </div>
                <div className="details">
                  <div className="column">
                    <div className="detail">
                      <span>{weatherState.humidity}</span>
                      <p>Humidité</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detail">
                      <span>
                        <svg width="18" height="18" viewBox="0 0 50 50">
                          <path d="M25 5 L40 45 L25 35 L10 45 Z" fill="currentColor" transform={`rotate(${weatherState.windAngle}, 25, 25)`} />
                        </svg>
                        {weatherState.wind}
                      </span>
                      <p>Vent</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detail">
                      <span>{weatherState.pressure}</span>
                      <p>Pression</p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <RainGauge minutely={minutelyData} />
              </section>
              <section>
                <div className="graphique">
                  {chartState.dataChart1.length > 0 && (
                    <>
                      <p className="sous-titre">Aujourd'hui</p>
                      <ResponsiveContainer width="100%" height={50}>
                        <LineChart margin={{ top: 5, left: 5, right: 5, bottom: -24 }} data={chartState.dataChart1}>
                          <XAxis axisLine={false} tick={false} dataKey="name" />
                          <YAxis yAxisId="temperature" domain={['dataMin', 'dataMax']} width={0} />
                          <YAxis yAxisId="precipitation" width={0} />
                          <Tooltip content={<CustomTooltip temperature={weatherState.temperature} />} wrapperStyle={{ zIndex: '999' }} />
                          <Line dataKey="temp" stroke="rgba(255,255,255,.7)" strokeWidth="2" dot={{ r: 4 }} yAxisId="temperature" />
                          <Line dataKey="precipitation" stroke="rgba(57,196,243,.7)" strokeWidth="2" dot={{ r: 4 }} yAxisId="precipitation" />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="images-chart1">
                        {chartState.dataChart1.length > 1 && chartState.dataChart1.map((item) => (
                          <Image
                            src={getImage(item.weather, item.sunDownH, item.sunUpH, item.name).imgSrc}
                            alt={item.description}
                            width={16}
                            height={15}
                            key={item.name}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="graphique">
                  <p className="sous-titre">Demain</p>
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart margin={{ top: 5, left: 5, right: 5, bottom: -24 }} data={chartState.dataChart2}>
                      <XAxis axisLine={false} tick={false} dataKey="name" />
                      <YAxis yAxisId="temperature" domain={['dataMin', 'dataMax']} width={0} />
                      <YAxis yAxisId="precipitation" width={0} />
                      <Tooltip content={<CustomTooltip getImage={getImage} temperature={weatherState.temperature} />} wrapperStyle={{ zIndex: '999' }} />
                      <Line dataKey="temp" stroke="rgba(255,255,255,.7)" strokeWidth="2" dot={{ r: 4 }} yAxisId="temperature" />
                      <Line dataKey="precipitation" stroke="rgba(57,196,243,.7)" strokeWidth="2" dot={{ r: 4 }} yAxisId="precipitation" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="images-chart2">
                    {chartState.dataChart2.map((item) => (
                      <Image
                        src={getImage(item.weather, item.sunDownH, item.sunUpH, item.name).imgSrc}
                        alt={item.description}
                        width={16}
                        height={15}
                        key={item.name}
                      />
                    ))}
                  </div>
                </div>
              </section>
              <section>
                <div className="daydetails">
                  {forecastState.days.map((day, index) => (
                    <div key={index} className="column daycolumn">
                      <p>{day}</p>
                      {forecastState.imgDays[index] && (
                        <Image src={forecastState.imgDays[index]} alt="" width={48} height={45} />
                      )}
                      <p>{forecastState.tempMeanDays[index]}</p>
                      <p className="small">min {forecastState.tempMinDays[index]}</p>
                      <p className="small">max {forecastState.tempMaxDays[index]}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="plus-info">
                <div><p>Qualité air</p><p>{weatherState.airPollution}</p></div>
                <div><p>Phase lune</p><p>{weatherState.moonPhase}</p></div>
                <div><p>Point de rosée</p><p>{weatherState.dewPoint}</p></div>
                <div><p>Couv. nuageuse</p><p>{weatherState.clouds}%</p></div>
                <div><p><BsFillSunriseFill /></p><p>{weatherState.sunrise}</p></div>
                <div><p><BsFillSunsetFill /></p><p>{weatherState.sunset}</p></div>
                <div><p>Longitude</p><p>{weatherState.longitudeCity}</p></div>
                <div><p>Latitude</p><p>{weatherState.latitudeCity}</p></div>
              </section>
              <footer>
                <Link href="https://openweathermap.org/" rel="noopener noreferrer">Données OpenWeather</Link>
              </footer>
            </>
          )}
        </main>
        {!showComponents && (
          <footer>
            GPL-3.0 <Link href="https://leoseguin.fr/">leoseguin.fr</Link>
          </footer>
        )}
      </div>
    </>
  )
}
