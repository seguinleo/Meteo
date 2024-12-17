import React, { JSX } from 'react'

interface RainJaugeProps {
  minutely: Array<{
    precipitation: number
  }>
}

export default function RainJauge ({ minutely }: RainJaugeProps): JSX.Element {
  const getColorForPrecipitation = (precipitation: number): string => {
    if (precipitation > 1) {
      return 'high'
    } else if (precipitation > 0) {
      return 'low'
    } else {
      return 'transparent'
    }
  }

  const sections = minutely.map((item, index) => ({
    id: index,
    color: getColorForPrecipitation(item.precipitation),
    precipitation: +item.precipitation.toFixed(2)
  }))

  const totalPrecipitation = sections.reduce((acc, item) => acc + item.precipitation, 0)
  const averagePrecipitation = (totalPrecipitation / sections.length).toFixed(2)

  return (
    <>
      {sections.every((item) => item.color === 'transparent')
        ? (
        <p className="details sous-titre">Pas de précipitations dans l&#39;heure</p>
          )
        : (
        <>
          <p className="details sous-titre">Précipitations dans l&#39;heure (moy: {averagePrecipitation} mm)</p>
          <div className="rain-jauge">
            {sections.map((item) => (
              <div key={item.id} className={`jauge-section ${item.color}`} />
            ))}
          </div>
          <div className="jauge-labels">
            <div className="jauge-label">+0min</div>
            <div className="jauge-label">+30min</div>
            <div className="jauge-label">+1h</div>
          </div>
        </>
          )}
    </>
  )
}
