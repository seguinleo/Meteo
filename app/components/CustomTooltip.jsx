/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';

export default function CustomTooltip({
  payload = [],
  label = '',
  getImage = '',
  temperature = 0,
}) {
  if (payload && payload.length) {
    const {
      temp,
      description,
      humidity,
      pressure,
      wind,
      windDeg,
      weather,
      precipitation,
      rain,
      uv,
      sunDownH,
      sunUpH,
    } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>
          {label}
          <Image
            src={getImage(weather, sunDownH, sunUpH, label, false).imgSrc}
            alt={description}
            width={48}
            height={45}
          />
        </p>
        <p>
          Température
          {' '}
          {temp.toFixed(1)}
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
          {(3.6 * wind).toFixed(0)}
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
          {rain.toFixed(0)}
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
          {uv.toFixed(0)}
        </p>
      </div>
    );
  }
}
