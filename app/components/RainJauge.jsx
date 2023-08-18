/* eslint-disable react/prop-types */
import React from 'react';

export default function RainJauge({ minutely }) {
  const getColorForPrecipitation = (precipitation) => {
    if (precipitation > 0.5) {
      return 'rgba(57,196,243,.8)';
    } if (precipitation > 0) {
      return 'rgba(57,196,243,.4)';
    }
    return 'transparent';
  };

  const sections = minutely.map((item) => getColorForPrecipitation(item.precipitation));

  return (
    <section>
      {sections.every((item) => item === 'transparent') ? (
        <p className="sous-titre">Pas de précipitations dans l&#39;heure</p>
      ) : (
        <>
          <p className="sous-titre">Précipitations dans l&#39;heure</p>
          <div className="rain-jauge">
            {sections.map((color) => (
              <div className="jauge-section" style={{ background: color }} />
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
