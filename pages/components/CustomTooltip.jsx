/* eslint-disable react/prop-types */
import React from 'react';

function CustomTooltip({
  active, payload, label, getImage,
}) {
  if (active && payload && payload.length) {
    const { weather } = payload[0].payload;
    const { rain } = payload[0].payload;
    const { humidity } = payload[0].payload;
    const { wind } = payload[0].payload;
    const { windDeg } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="bold">
          {label}
          {getImage(weather.id)}
        </p>
        <p>
          Température
          {' '}
          {payload[0].value.toFixed(0)}
          °C
        </p>
        <p>
          Humidité
          {' '}
          {humidity}
          %
        </p>
        <p>
          <svg width="18" height="18" viewBox="0 0 50 50">
            <path d="M25 5 L40 45 L25 35 L10 45 Z" fill="currentColor" transform={`rotate(${windDeg + 180}, 25, 25)`} />
          </svg>
          Vent
          {' '}
          {(3.6 * wind).toFixed(0)}
          km/h
        </p>
        <p>
          Pluie
          {' '}
          {(rain * 100).toFixed(0)}
          %
        </p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
