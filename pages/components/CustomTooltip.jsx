import React from 'react';
import PropTypes from 'prop-types';

function CustomTooltip({
  payload, label, getImage, temperature,
}) {
  if (payload && payload.length) {
    const {
      temp,
      humidity,
      pressure,
      wind,
      windDeg,
      weather,
      rain,
      uv,
    } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="bold">
          {label}
          {getImage(weather.id)}
        </p>
        <p>
          Température
          {' '}
          {temp.toFixed(0)}
          {temperature.endsWith('C') ? '°C' : '°F'}
        </p>
        <p>
          Humidité
          {' '}
          {humidity}
          %
        </p>
        <p>
          Pressure
          {' '}
          {pressure}
          hPa
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
          Pluie
          {' '}
          {rain.toFixed(0)}
          %
        </p>
        <p>
          Indice UV
          {' '}
          {uv.toFixed(0)}
        </p>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  getImage: PropTypes.func.isRequired,
  temperature: PropTypes.string.isRequired,
};

CustomTooltip.defaultProps = {
  label: '',
  payload: [],
};

export default CustomTooltip;
