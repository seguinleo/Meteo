/* eslint-disable react/prop-types */
import React from 'react';

export default function RainJauge({ minutely }) {
  const getColorForPrecipitation = (precipitation) => {
    if (precipitation > 0.8) {
      return 'high';
    } if (precipitation > 0) {
      return 'low';
    }
    return 'transparent';
  };

  const sections = minutely.map((item, index) => ({
    id: index,
    color: getColorForPrecipitation(item.precipitation),
    precipitation: item.precipitation.toFixed(2),
  }));

  return (
    <section>
      {sections.every((item) => item.color === 'transparent') ? (
        <p className="sous-titre">Pas de précipitations dans l&#39;heure</p>
      ) : (
        <>
          <p className="sous-titre">Précipitations dans l&#39;heure</p>
          <div className="rain-jauge">
            {sections.map((item) => (
              <div
                key={item.id}
                className={`jauge-section + ${item.color}`}
              />
            ))}
          </div>
          <div className="jauge-labels">
            <div className="jauge-label">+0min</div>
            <div className="jauge-label">+30min</div>
            <div className="jauge-label">+1h</div>
          </div>
        </>
      )}
    </section>
  );
}
