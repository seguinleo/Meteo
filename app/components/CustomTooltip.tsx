import React from 'react'

interface CustomTooltipProps {
  payload?: any[]
  label?: string
  temperature?: string
  getImage?: (id: any, sunDown: any, sunUp: any, time: any, main: any) => {
    imgSrc: string
    backgroundColor: string
  }
}

export default function CustomTooltip ({
  payload = [],
  label = '',
  temperature = '0°C'
}: CustomTooltipProps): JSX.Element | null {
  if (Array.isArray(payload) && (payload.length > 0)) {
    const {
      temp,
      humidity,
      pressure,
      wind,
      windDeg,
      precipitation,
      rain,
      uv
    } = payload[0].payload
    return (
      <div className="custom-tooltip">
        <p className="bold">
          {label}
        </p>
        <p>
          Température
          {' '}
          {temp}
          {temperature.endsWith('C') ? '°C' : '°F'}
        </p>
        <p>
          Humidité
          {' '}
          {humidity}
          %
        </p>
        <p>
          Vent
          {' '}
          <svg width="18" height="18" viewBox="0 0 50 50">
            <path d="M25 5 L40 45 L25 35 L10 45 Z" fill="currentColor" transform={`rotate(${windDeg + 180}, 25, 25)`} />
          </svg>
          {wind}
          {temperature.endsWith('C') ? 'km/h' : 'mph'}
        </p>
        <p>
          Pression
          {' '}
          {pressure}
          hPa
        </p>
        <p>
          Pluie (proba.)
          {' '}
          {rain}
          %
        </p>
        <p>
          Précipitations
          {' '}
          {precipitation}
          mm
        </p>
        <p>
          UV
          {' '}
          {uv}
        </p>
      </div>
    )
  }
  return null
}
